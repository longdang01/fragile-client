import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ProductService from "../../services/product.service";
import Breadcrumb from "../shared/Breadcrumb";
import ProductFilterCategory from "./ProductFilterCategory";
import ProductList from "./ProductList";

import "./Product.scss";

const TITLE = "Trang Chủ";
const TITLE_NAME = "Trang Chủ";

const Product = () => {
  const { pathname, search } = useLocation();
  const { previous, path, parent, child } = useParams();

  const parameters = new URLSearchParams(search);
  const searchData = parameters.get("searchTerm");

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const getByClient = () => {
    ProductService.getByClient({
      previous: previous,
      path: path,
      parent: parent,
      child: child,
    })
      .then((res) => {
        setProducts(res.data.products);
        if (res.data.category) setCategory(res.data.category);
        if (res.data.subCategory) setSubCategory(res.data.subCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    ProductService.search({
      searchData: searchData,
    })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchData) getProducts();
    else getByClient();
  }, [pathname]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>
            {TITLE + " / Fragile - Thương Hiệu Thời Trang Việt Nam"}
          </title>
        </Helmet>
      </HelmetProvider>
      <div>
        <Breadcrumb currentPage="Cửa Hàng" />
        <div className="axil-shop-area axil-section-gap bg-color-white">
          <div className="container">
            {!searchData ? (
              <div className="row">
                {/* Start Categorie Area  */}
                <ProductFilterCategory category={category} />
                {/* End Categorie Area  */}
              </div>
            ) : (
              <div className="section-title-wrapper mb-[150px]">
                <span
                  className="title-highlighter highlighter-secondary"
                  style={{ color: "black", fontStyle: "italic" }}
                >
                  {/* <i className="uil uil-store"></i> */}
                  <i className="uil uil-search"></i>
                  Đang tìm kiếm: {searchData}
                </span>
              </div>
            )}
            <ProductList products={products} />
          </div>
          {/* End .container */}
        </div>
      </div>
    </>
  );
};

export default Product;
