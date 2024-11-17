using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.ML;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using OxyPlot;
using OxyPlot.Series;
using Microsoft.Win32;
using OxyPlot.Wpf;
using ProductSalesAnomalyDetection;
 

namespace GUI
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnLoadFile_Click(object sender, RoutedEventArgs e)
        {
            // Chọn file CSV
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Filter = "CSV Files (*.csv)|*.csv"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                string filePath = openFileDialog.FileName;

                // Phân tích dữ liệu từ file CSV
                var results = AnalyzeData(filePath);

                // Hiển thị kết quả trong ListView
                lvResults.ItemsSource = results;

                // Vẽ biểu đồ
                PlotGraph(results);
            }
        }

        private List<AnalysisResult> AnalyzeData(string filePath)
        {
            var mlContext = new MLContext();
            var dataView = mlContext.Data.LoadFromTextFile<ProductSalesData>(filePath, hasHeader: true, separatorChar: ',');

            // Phát hiện bất thường bằng DetectIidSpike và DetectIidChangePoint
            var spikeResults = DetectSpike(mlContext, 36, dataView);
            var changePointResults = DetectChangepoint(mlContext, 36, dataView);

            // Kết hợp kết quả từ hai phương pháp
            var results = spikeResults.Concat(changePointResults).ToList();
            return results;
        }

        private List<AnalysisResult> DetectSpike(MLContext mlContext, int docSize, IDataView productSales)
        {
            var iidSpikeEstimator = mlContext.Transforms.DetectIidSpike(outputColumnName: "Prediction",inputColumnName: "numSales", confidence: 95,     pvalueHistoryLength: docSize / 4);

            var iidSpikeTransform = iidSpikeEstimator.Fit(CreateEmptyDataView(mlContext));
            var transformedData = iidSpikeTransform.Transform(productSales);

            var predictions = mlContext.Data.CreateEnumerable<ProductSalesPrediction>(transformedData, reuseRowObject: false).ToList();

            return predictions.Select(p => new AnalysisResult
            {
                AnomalyType = "Spike",
                Alert = p.Prediction[0] == 1 ? "Spike detected" : "No spike",
                Score =  Math.Round(p.Prediction[1], 2),
                PValue = Math.Round(p.Prediction[2], 2)
            }).ToList();
        }

        private List<AnalysisResult> DetectChangepoint(MLContext mlContext, int docSize, IDataView productSales)
        {
            var iidChangePointEstimator = mlContext.Transforms.DetectIidChangePoint(         outputColumnName: "Prediction",         inputColumnName: "numSales",         confidence: 95,         changeHistoryLength: docSize / 4);

            var iidChangePointTransform = iidChangePointEstimator.Fit(CreateEmptyDataView(mlContext));
            var transformedData = iidChangePointTransform.Transform(productSales);

            var predictions = mlContext.Data.CreateEnumerable<ProductSalesPrediction>(transformedData, reuseRowObject: false).ToList();

            return predictions.Select(p => new AnalysisResult
            {
                AnomalyType = "Changepoint",
                Alert = p.Prediction[0] == 1 ? "Change detected" : "No change",
                Score =  Math.Round(p.Prediction[1], 2),
                PValue = Math.Round(p.Prediction[2], 2)
            }).ToList();
        }

        private void PlotGraph(List<AnalysisResult> results)
        {
            var plotModel = new PlotModel { Title = "Product Sales Anomaly Detection" };

            var series = new LineSeries { Title = "Sales" };
            var spikeSeries = new ScatterSeries { MarkerType = MarkerType.Circle, MarkerFill = OxyColors.Red, Title = "Spike" };
            var changepointSeries = new ScatterSeries { MarkerType = MarkerType.Circle, MarkerFill = OxyColors.Blue, Title = "Changepoint" };

            for (int i = 0; i < results.Count; i++)
            {
                series.Points.Add(new DataPoint(i, results[i].Score));

                if (results[i].AnomalyType == "Spike" && results[i].Alert.Contains("detected"))
                {
                    spikeSeries.Points.Add(new ScatterPoint(i, results[i].Score));
                }
                else if (results[i].AnomalyType == "Changepoint" && results[i].Alert.Contains("detected"))
                {
                    changepointSeries.Points.Add(new ScatterPoint(i, results[i].Score));
                }
            }

            plotModel.Series.Add(series);
            plotModel.Series.Add(spikeSeries);
            plotModel.Series.Add(changepointSeries);
            plotView.Model = plotModel;
        }

        // Tạo DataView trống
        static IDataView CreateEmptyDataView(MLContext mlContext)
        {
            IEnumerable<ProductSalesData> enumerableData = new List<ProductSalesData>();
            return mlContext.Data.LoadFromEnumerable(enumerableData);
        }
    }

    public class AnalysisResult
    {
        public string AnomalyType { get; set; }  
        public string Alert { get; set; }
        public double Score { get; set; }
        public double PValue { get; set; }
    }

}