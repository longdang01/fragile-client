import {
  useLocation,
  useParams,
  useOutletContext,
  Link,
} from "react-router-dom";
import "./SideBar.scss";

const SideBar = () => {
  const { pathname } = useLocation();
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
              <i className="fas fa-user"></i>
              <span>Đổi Mật Khẩu</span>
            </Link>
            <a className="nav-item nav-link" href={undefined}>
              {/* <i className="fal fa-sign-out"></i> */}
              {/* <i className="uil uil-sign-out-alt"></i> */}
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
