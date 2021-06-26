import Skeleton from "react-loading-skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="row mb-4">
      <div className="col-lg-8 col-md-6 col-sm-12 text-xs-center">
        <div className="product-detail">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="info">
                <div className="title mb-4">
                  <h1 className="h3">
                    <Skeleton count={1} />
                  </h1>
                </div>
                <div className="img">
                  <Skeleton count={1} height={180} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="variations">
                <div className="size mb-3">
                  <div className="mb-2 fw-bold">
                    <Skeleton count={1} width={50} />
                  </div>
                  <Skeleton count={1} width={75} />
                </div>
                <div className="color mb-2">
                  <Skeleton className="mb-2 d-block" count={1} width={55} />
                  <Skeleton
                    className="me-2 mb-1"
                    count={10}
                    circle={true}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="p-3 add-to-cart-card bg-light border rounded">
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Skeleton width={35} />
              <Skeleton width={120} />
            </div>
            <Skeleton className="me-2" width={15} height={15} circle={true} />
            <Skeleton width={220} />
          </div>
          <Skeleton count={1} height={35} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
