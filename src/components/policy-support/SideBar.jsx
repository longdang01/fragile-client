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
              to="/support/purchase"
              className={
                "nav-item nav-link " +
                (pathname == "/support/purchase" ? "active" : "")
              }
            >
              <i className="fa-solid fa-info"></i>
              <span>Hỗ Trợ Mua Hàng</span>
            </Link>
            <Link
              to="/support/faq"
              className={
                "nav-item nav-link " +
                (pathname == "/support/faq" ? "active" : "")
              }
              href={undefined}
            >
              <i className="fa-regular fa-circle-question"></i>
              <span>Câu Hỏi Thường Gặp</span>
            </Link>
            <Link
              to="/policy/privacy"
              className={
                "nav-item nav-link " +
                (pathname == "/policy/privacy" ? "active" : "")
              }
              href={undefined}
            >
              <i className="fa-solid fa-shield-halved"></i>
              <span>Chính Sách Bảo Mật</span>
            </Link>
            <Link
              to="/policy/usage"
              className={
                "nav-item nav-link " +
                (pathname == "/policy/usage" ? "active" : "")
              }
            >
              <i className="fa-regular fa-bookmark"></i>
              <span>Chính Sách Sử Dụng</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
