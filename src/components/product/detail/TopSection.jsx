import Button from "../../base/Button";

const TopSection = ({
  product,
  addToCartLoading,
  variations,
  handleVariationsChange,
  handleAddToCart,
  windowWidth,
}) => {
  return (
    <div className="row mb-4">
      <div className="col-lg-8 col-md-6 col-sm-12">
        <div className="product-detail">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="info">
                <div className="title mb-4">
                  <h1 className="h3">{product.title}</h1>
                </div>
                <div className="img text-xs-center">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              {product.variations && (
                <div className="variations">
                  {product.variations.map((variation) =>
                    variation.name === "Size" ? (
                      <div key={variation.id} className="size mb-3">
                        <div className="mb-2 fw-bold">Sizes: </div>
                        <select
                          defaultValue={variation.item_variations[0].id}
                          name="Size"
                          onChange={handleVariationsChange}
                          className="w-25"
                        >
                          {variation.item_variations.map((iv) => (
                            <option key={iv.id} id={iv.id} value={iv.id}>
                              {iv.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div key={variation.id} className="color mb-2">
                        <div className="mb-2 fw-bold">Colors: </div>
                        {variation.item_variations.map((iv) => (
                          <div
                            key={iv.id}
                            className="color-chooser d-inline-block"
                          >
                            <input
                              checked={variations.Color === iv.id}
                              onChange={handleVariationsChange}
                              type="radio"
                              name="Color"
                              id={iv.id}
                              value={iv.id}
                            ></input>
                            <label htmlFor={iv.id}>
                              <span
                                style={{ backgroundColor: iv.value }}
                              ></span>
                            </label>
                            <span className="color-name">{iv.name}</span>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {windowWidth > 767 && (
        <div className="col-lg-4 col-md-6 col-sm-12">
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
      )}
    </div>
  );
};

export default TopSection;
