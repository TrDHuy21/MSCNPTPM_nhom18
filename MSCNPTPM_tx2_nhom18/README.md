# Product Sales Anomaly Detection Solution

## Giới thiệu
Đây là một Solution .NET gồm 2 dự án:
1. **ProductSalesAnomalyDetection**: Một ứng dụng console dùng để phân tích tệp `.csv`, phát hiện các điểm bất thường (anomaly) trong dữ liệu bán hàng.
2. **GUI**: Giao diện WPF cho phép người dùng dễ dàng chọn tệp `.csv`, xử lý dữ liệu và xem kết quả phân tích qua danh sách và biểu đồ.

## Cấu trúc Solution
├── GUI/ # Thư mục chứa dự án giao diện người dùng (WPF)<br>
├── ProductSalesAnomalyDetection/ # Thư mục chứa dự án phân tích (console app) <br>
   ├── Data/ # Thư mục chứa các tệp CSV mẫu <br>
   ├── README.md # File hướng dẫn <br>
   └── ProductSales.sln # Solution file<br>
## Yêu cầu hệ thống
- .NET SDK 6.0 hoặc mới hơn
- Windows (cần thiết để chạy WPF)
- Visual Studio (khuyên dùng bản Community hoặc cao hơn)

## Hướng dẫn chạy dự án

### 1. Chạy bằng giao diện GUI
Giao diện này giúp người dùng không cần thao tác dòng lệnh, thao tác như sau:
1. Mở Solution bằng Visual Studio.
2. Chọn **Set as Startup Project** cho **GUI**.
3. Nhấn `Ctrl + F5` để chạy dự án.
4. Trong giao diện, nhấn **Chọn tệp CSV** để tải tệp dữ liệu.
  Kết quả sẽ hiển thị:
   - **Danh sách kết quả**: Các điểm bất thường được đánh dấu rõ ràng.
   - **Biểu đồ**: Điểm bất thường được hiển thị bằng màu đỏ.

### 2. Chạy bằng ứng dụng console
Ứng dụng console phù hợp khi cần phân tích nhanh qua dòng lệnh:
1. Mở Solution bằng Visual Studio.
2. Chọn **Set as Startup Project** cho **ProductSalesAnomalyDetection**.
3. Nhấn `Ctrl + F5` để chạy dự án.
4. Kết quả sẽ hiển thị trực tiếp trong cửa sổ console, dữ liệu được phân tích là của tệp product-sales.csv trong folder Date.

### 3. Sử dụng dữ liệu mẫu
- Một tệp mẫu (`product-sales.csv`) nằm trong thư mục `Data/`. 
- Tệp này chứa dữ liệu bán hàng gồm hai cột: **Month** (tháng) và **ProductSales** (số lượng bán ra).

 
### 1. Setup trực tiếp từ file .exe Installer (file đóng gói dự án bằng NSIS)
Trong folder "Installer" tìm đến ProductSalesAnomalyDetectionInstaller.exe, 
chọn Run, khi đó sẽ cài được dự án và đồng thời tạo ShortCut có tên  "ProductSalesAnomalyDetection".
 Tiếp theo thực hiện chọn tệp .CSV để tiến hành phân tích