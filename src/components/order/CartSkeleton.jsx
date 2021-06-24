import Skeleton from "react-loading-skeleton";

const CartSkeleton = () => {
  return (
    <>
      <div className="col-md-8 col-sm-6 col-xs-12 mb-4">
        <div className="order-address__section order-cart__shadow border mb-4 p-4 rounded-3">
          <div className="address-selected-info">
            <header className="mb-3">
              <h5>Default address</h5>
            </header>
            <hr />
            <div className="address mb-3">
              <Skeleton />
            </div>
            <div className="reciever mb-4">
              <Skeleton width={20} height={20} circle={true} className="me-2" />
              <Skeleton width={80} />
            </div>
            <div className="edit__add">
              <span>
                <Skeleton width={210} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
        <div className="order-cart__shadow border mb-4 p-4 rounded-3">
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={80} />
              <Skeleton width={130} />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Skeleton width={100} />
              <Skeleton width={130} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Skeleton width={80} />
              <Skeleton width={130} />
            </div>
          </div>
          <Skeleton height={35} />
        </div>
      </div>
    </>
  );
};

export default CartSkeleton;
