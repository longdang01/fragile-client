import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CollectionService from "../../services/collection.service";
import Breadcrumb from "../shared/Breadcrumb";
import * as moment from "moment";
import fragile_brand from "../../assets/images/fragile-brand.jpg";
import "./Collection.scss";
const TITLE = "Bộ Sưu Tập";
const TITLE_NAME = "Bộ Sưu Tập";

const Collection = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = () => {
    CollectionService.search({
      searchData: "",
    })
      .then((res) => {
        console.log(res.data);
        setCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCollections();
  }, []);

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
      <Breadcrumb currentPage="Bộ Sưu Tập" />

      <div className="collection-page">
        <div className="axil-most-sold-product axil-section-gap">
          <div className="container">
            <div className="product-area pb--50">
              {/* <div className="section-title-wrapper section-title-center">
              <span className="title-highlighter highlighter-primary">
                <i className="fas fa-star"></i> Most Sold
              </span>
              <h2 className="title">Most Sold in eTrade Store</h2>
            </div> */}
              <div className="row row-cols-xl-2 row-cols-1 row--15">
                {collections &&
                  collections.map((collection, index) => (
                    <div className="col" key={index}>
                      <div className="axil-product-list">
                        <div className="thumbnail">
                          <Link to={"/collection/" + collection.path}>
                            <img
                              src={
                                collection.collectionImages[0] || fragile_brand
                              }
                              className="sal-animate"
                            />
                          </Link>
                        </div>
                        <div className="product-content">
                          <h6 className="product-title">
                            <Link to={"/collection/" + collection.path}>
                              {collection.collectionName}
                            </Link>
                          </h6>
                          <div className="product-price-variant">
                            <span className="price current-price">
                              {"Ngày Phát Hành: " +
                                moment(collection.releaseDate).format(
                                  "DD/MM/YYYY"
                                )}
                            </span>
                            {/* <span className="price old-price">$49.99</span> */}
                          </div>
                          <div className="product-cart">
                            <Link
                              to={"/collection/" + collection.path}
                              className="cart-btn"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </Link>
                            {/* <a href="wishlist.html" className="cart-btn">
                        <i className="fal fa-heart"></i>
                      </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
