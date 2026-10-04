# Phát triển trang web xem hoạt hình trực tuyến

Mở `index.html` bằng trình duyệt, hoặc chạy bằng Live Server. Cần mạng để tải video và ảnh từ nguồn bên ngoài.

## Chức năng

- Layout DIV: header, head-link, left content, right content, footer.
- Logo bên trái, header sticky khi cuộn.
- Danh sách bên trái, mặc định phát hiện video đầu tiên ở bên phải (không tự phát âm thanh).
- Tìm kiếm không phân biệt dấu tiếng Việt; sắp xếp mới cập nhật hoặc lượt chọn trên thiết bị.
- Yêu thích lưu bằng localStorage; menu danh mục, trạng thái rỗng và chuyển video.
- Hai video Peppa tiếng Việt nhúng bằng iframe từ kênh chính thức.
- Big Buck Bunny không lời dùng video HTML5 có controls.
- Responsive: điện thoại đưa trình phát lên trước danh sách.

## Nguồn

- https://www.youtube.com/watch?v=N89AJ_cZq8U
- https://www.youtube.com/watch?v=jTh2HlDNAJ0
- https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

Trang không đặt quảng cáo. YouTube có thể hiển thị quảng cáo hoặc hạn chế nhúng; chất lượng HD phụ thuộc nguồn và mạng. Có link mở video gốc nếu không phát được. Số lượt chọn là dữ liệu cục bộ, không phải số lượt xem thực trên YouTube. Đây là bài tập frontend, không có backend thống kê hoặc máy chủ lưu phim riêng.
