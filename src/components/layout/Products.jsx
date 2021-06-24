import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaFolderOpen } from "react-icons/fa";
import "../../static/layout/css/products.css";

const Products = ({ skeletonNum, products, loading, showEmpty = false }) => {
  const range = (n) => [...Array(n).keys()];

  return (
    <div className="row">
      {loading ? (
        range(skeletonNum).map((num) => (
          <div key={num} className="col-lg-3 col-md-4 col-sm-12 pb-4">
            <div className="card bg-transparent border-0">
              <Skeleton count={1} height={180} />
              <div className="card-body position-relative">
                <div className="title">
                  <p className="card-text">
                    <Skeleton count={1} />
                  </p>
                </div>
                <div className="prices mt-2">
                  <div className="price">
                    <Skeleton count={1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {products.map((obj) => (
            <div key={obj.id} className="col-lg-3 col-md-4 col-sm-12 pb-4">
              <div className="card product-card">
                <img src={obj.image} className="card-img-top" alt={obj.title} />
                <div className="card-body position-relative">
                  <div className="title">
                    <p className="card-text">{obj.title}</p>
                  </div>
                  <div className="prices mt-2">
                    {obj.get_formated_discount ? (
                      <>
                        <div className="mb-1">
                          <span className="badge rounded-pill bg-danger">
                            {obj.get_percent}%
                          </span>
                          <span className="old-price text-danger m-2">
                            <del>{obj.get_formated_price}</del>
                          </span>
                        </div>
                        <div className="price">
                          {obj.get_formated_discount} Toman
                        </div>
                      </>
                    ) : (
                      <div className="price position-absolute">
                        {obj.get_formated_price} Toman
                      </div>
                    )}
                  </div>
                </div>
                <Link
                  to={`/product/${obj.id}/${obj.slug}/`}
                  className="stretched-link"
                ></Link>
              </div>
            </div>
          ))}
          {showEmpty && products.length < 1 && (
            <div className="text-center mt-5">
              <FaFolderOpen size="70" className="text-secondary mb-3" />
              <h4 className="text-danger">Not enough products to show!</h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
