import {
  useLocation,
  useParams,
  useOutletContext,
  Link,
  useNavigate,
} from "react-router-dom";
import "./SideBar.scss";

const SideBar = ({ setCartNumber, setCustomer }) => {
  const { pathname } = useLocation();
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("CUSTOMER");
    setCartNumber(0);
    setCustomer(null);
    navigate("/login");
  };

  return (
    <>
      <aside className="axil-dashboard-aside">
        <nav className="axil-dashboard-nav">
          <div className="nav nav-tabs" role="tablist">
            <Link
              to="/account/dashboard"
              className={
                "nav-item nav-link " +
                (pathname == "/account/dashboard" ? "active" : "")
              }
            >
              <i className="fas fa-th-large"></i>
              <span>Bảng Điều Khiển</span>
            </Link>
            <Link
              to="/account/orders"
              className={
                "nav-item nav-link " +
                (pathname == "/account/orders" ? "active" : "")
              }
              href={undefined}
            >
              <i className="fas fa-shopping-basket"></i>
              <span>Theo Dõi Đơn Hàng</span>
            </Link>
            <Link
              to="/account/delivery-address"
              className={
                "nav-item nav-link " +
                (pathname == "/account/delivery-address" ? "active" : "")
              }
              href={undefined}
            >
              <i className="fas fa-home"></i>
              <span>Địa Chỉ Nhận Hàng</span>
            </Link>
            <Link
              to="/account/profile"
              className={
                "nav-item nav-link " +
                (pathname == "/account/profile" ? "active" : "")
              }
            >
              <i className="fas fa-user"></i>
              <span>Thông Tin Tài Khoản</span>
            </Link>
            <Link
              to="/account/change-password"
              className={
                "nav-item nav-link " +
                (pathname == "/account/change-password" ? "active" : "")
              }
            >
              <i className="fa-solid fa-key"></i>
              <span>Đổi Mật Khẩu</span>
            </Link>
            <a
              className="nav-item nav-link cursor-pointer"
              href={undefined}
              onClick={logout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Đăng Xuất</span>
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
