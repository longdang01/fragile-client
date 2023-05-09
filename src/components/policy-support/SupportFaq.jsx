const SupportFaq = () => {
  return (
    <>
      <div className="axil-dashboard-overview">
        <div className="welcome-text">Câu Hỏi Thường Gặp,</div>
        <div>
          <div>Các câu hỏi thường gặp mà bạn có thể thắc mắc</div>
          <ul style={{ padding: "18px" }}>
            <li
              style={{
                marginBottom: "20px",
                listStyle: "disc",
                lineHeight: "2",
              }}
            >
              Chất liệu và cách chăm sóc: Máy sấy tiêu thụ rất nhiều năng lượng.
              Thay vì sử dụng máy sấy, treo quần áo sẽ giúp chăm sóc quần áo của
              bạn vì nó làm giảm hao mòn vải, tạo ra ít nếp nhăn, không làm co
              quần áo, ngăn ngừa xơ vải và cũng không tiêu tốn năng lượng. Mỗi
              lần giặt sẽ tiêu tốn nước và năng lượng; bằng cách cho đồ đầy lồng
              giặt, số lần giặt giũ sẽ giảm đi và quần áo sẽ ít hao mòn hơn.
              Tránh làm máy giặt quá tải để có được một kết quả tốt. Ngoài ra,
              giặt ở nhiệt độ thấp có lợi hơn cho quần áo, không làm co sợ vải
              và giúp duy trì màu sắc của vải, đồng thời tiêu thụ ít năng lượng
              hơn.
              <a
                href="#"
                style={{
                  color: "black",
                  display: "block",
                  textDecoration: "underline",
                }}
              >
                Đang cập nhật hướng dẫn bảo quản
              </a>
            </li>
            {/* <li style={{ marginBottom: "20px", , lineHeight: "2" }}>
              Bạn phải thêm các sản phẩm vào giỏ hàng và chọn các sản phẩm muốn
              mua, chọn địa chỉ nơi bạn muốn nhận chúng và thực hiện thanh toán
            </li>
            <li style={{ marginBottom: "20px", listStyle: "disc" }}>
              Bạn phải thêm các sản phẩm vào giỏ hàng và chọn các sản phẩm muốn
              mua, chọn địa chỉ nơi bạn muốn nhận chúng và thực hiện thanh toán
            </li>
            <li style={{ marginBottom: "20px", listStyle: "disc" }}>
              Khi bạn đã mua hàng xong, chúng tôi sẽ gửi cho bạn một email xác
              nhận với tất cả các thông tin về đơn hàng. Bạn có thể theo dõi đơn
              đặt hàng của mình từ tài khoản của bạn.
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SupportFaq;
