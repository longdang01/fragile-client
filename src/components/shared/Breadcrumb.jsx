import { Link } from "react-router-dom";

const Breadcrumb = ({ currentPage }) => {
  return (
    <>
      <div className="axil-breadcrumb-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8">
              <div className="inner">
                <ul className="axil-breadcrumb">
                  <li className="axil-breadcrumb-item">
                    <Link to="/" className="font-bold">
                      Trang Chủ
                    </Link>
                  </li>
                  <li className="separator"></li>
                  <li
                    className="axil-breadcrumb-item active font-bold"
                    aria-current="page"
                    style={{ fontWeight: "bold" }}
                  >
                    {currentPage}
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-6 col-md-4">
                <div className="inner">
                  <div className="bradcrumb-thumb">
                    <img src={fragile_brand} alt="Image" />
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
