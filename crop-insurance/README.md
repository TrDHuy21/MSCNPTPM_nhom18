## Bài cuối học phần
 	1,Cài đặt ứng dụng
 	Cài đặt Node.Js và npm
Cài đặt Node.js và npm (Node Package Manager). Bạn có thể tải và cài đặt Node.js. Sau khi cài đặt dùng lệnh: node -v và npm-v để kiểm tra xác nhận rằng Node.js và npm đã được cài đặt thành công.	Cài đặt MetaMask
MetaMask là một ví điện tử chạy trên trình duyệt để bạn có thể tương tác với các ứng dụng phi tập trung (DApps) và hợp đồng thông minh trên Ethereum.
Bước 1: Cài Đặt MetaMask
1.	Truy cập MetaMask và tải extension cho trình duyệt của bạn (Chrome, Firefox, Brave, v.v.).
2.	Sau khi cài đặt, mở MetaMask và làm theo hướng dẫn để tạo ví mới hoặc sử dụng ví hiện có.
Bước 2: Kết Nối MetaMask Với Ganache
1.	Mở MetaMask và click vào Mạng (mặc định là "Ethereum Mainnet").
2.	Chọn Add Network và nhập thông tin sau để kết nối MetaMask với mạng Ganache:
-	Network Name: Ganache
-	New RPC URL: http://127.0.0.1:8545
-	Chain ID: 1337 (Đây là Chain ID mặc định của Ganache).
-	Currency Symbol: ETH
-	Block Explorer URL: (Bạn có thể bỏ qua bước này)
3.	Sau khi nhập thông tin, click Save.


 
npm install -g truffle
npm install web3@1.10.0
 
  Khởi tạo dự án Truffle
mkdir crop-insurance
cd crop-insurance
truffle init

Triển khai hợp đồng:
truffle migrate --network development

Chạy dự án

Bước 1: Trong cửa sổ VS Code, ta mở terminal và chạy lệnh : ganache-cli
Tác dụng: nó tạo ra một danh sách các tài khoản giả lập với một lượng ETH "ảo" ban đầu (không có giá trị thực). Điều này rất hữu ích để kiểm tra giao dịch và triển khai hợp đồng mà không tốn phí.
Bước 2: mở cửa sổ terminal thứ 2 và chạy lệnh: truffle migrate --network development

Bước 3: Trong trình duyệt Web, mở Extension MetaMask đã được cài đặt từ trước đó, thiết lập một mạng thủ công và sử dụng nó.

Bước 4: Copy một  Private Keys đã được sinh ra bởi Ganache-cli và thêm một tài khoản: Chọn “Add account or hardware wallet” >> “Nhập tài khoản”>> và dán Private Keys từ copy để thêm.
Bước 5: Copy phần contractAddress tương ứng với Private Key để dán vào biến contractAddress trong app.js của dự án 
Bước 6: Chạy file index.html để test các chức năng cơ bản của dự án.





