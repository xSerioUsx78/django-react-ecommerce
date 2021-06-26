import Button from "../../base/Button";

const ProductDetailFooter = ({
  product,
  addToCartLoading,
  handleAddToCart,
}) => {
  return (
    <div className="product-detail__fixed-footer posotion-relative w-100">
      <div className="bg-light border rounded p-3 add-to-cart-card">
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>Price:</div>
            <div>
              {product.get_formated_discount ? (
                <>
                  <div className="mb-1">
                    <span className="badge rounded-pill bg-danger">
                      {product.get_percent}%
                    </span>
                    <span className="old-price text-danger m-2">
                      <del>{product.get_formated_price}</del>
                    </span>
                  </div>
                  <div className="price">
                    {product.get_formated_discount} Toman
                  </div>
                </>
              ) : (
                <div>{product.get_formated_price} Toman</div>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleAddToCart} method="POST">
          {addToCartLoading ? (
            <Button
              className="warning w-100"
              text="Adding to cart"
              type="button"
              loading={true}
            />
          ) : (
            <Button
              className="warning w-100"
              text="Add to cart"
              type="submit"
              loading={false}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductDetailFooter;
