import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  increaseItem,
  decreaseItem,
  deleteItem,
} from "../../redux/actions/cart";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "../../static/layout/css/cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (id, index) => {
    dispatch(increaseItem(id, index));
  };

  const handleDecrease = (id, index) => {
    dispatch(decreaseItem(id, index));
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };
  
  return (
    <div className="cart-page-wrapper mt-4 mb-4">
      <div className="container">
        <h5 className="mb-2">Cart</h5>
        {cart.isLoading ? (
          <>
            <Skeleton height={30} count={1} className="mb-4" />
            <Skeleton height={90} count={4} className="mb-3" />
          </>
        ) : (
          <>
            {cart.order !== null &&
            cart.order[0] &&
            cart.order[0].order_items.length > 0 ? (
              <>
                <div className="table-responsive mb-4">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product image</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.order[0].order_items.map((obj, i) => (
                        <tr key={obj.id}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            <Link
                              to={`/product/${obj.product.id}/${obj.product.slug}`}
                            >
                              <img
                                className="img-80"
                                src={obj.product.image}
                                alt={obj.product.title}
                              />
                            </Link>
                          </td>
                          <td>
                            {obj.product.title}
                            {obj.variation.map((v) =>
                              v.name ? (
                                <span key={v.id} className="ms-2">
                                  Color:{" "}
                                  <span
                                    className="bullet-color"
                                    style={{ backgroundColor: v.value }}
                                  ></span>
                                </span>
                              ) : (
                                <span key={v.id} className="ms-2">
                                  Size: {v.value}
                                </span>
                              )
                            )}
                          </td>
                          <td>
                            {obj.product.get_formated_discount ? (
                              <>
                                <div className="mb-1">
                                  <span className="badge rounded-pill bg-danger me-2">
                                    {obj.product.get_percent}%
                                  </span>
                                  <span className="old-price text-danger">
                                    <del>{obj.product.get_formated_price}</del>
                                  </span>
                                </div>
                                <div className="price">
                                  {obj.product.get_formated_discount} Toman
                                </div>
                              </>
                            ) : (
                              <div className="price">
                                {obj.product.get_formated_price} Toman
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="border rounded p-1">
                              <FaPlus
                                onClick={() => handleIncrease(obj.id, i)}
                                className="cursor-pointer text-info me-3"
                              />
                              {cart.quantityLoading.isLoading &&
                              cart.quantityLoading.id === obj.id ? (
                                <div
                                  className="spinner-border spinner-border-sm text-info"
                                  role="status"
                                ></div>
                              ) : (
                                obj.quantity
                              )}
                              {obj.quantity > 1 ? (
                                <FaMinus
                                  onClick={() => handleDecrease(obj.id, i)}
                                  className="cursor-pointer text-info ms-3"
                                />
                              ) : (
                                <FaMinus className="text-black-50 ms-3" />
                              )}
                            </span>
                            <span className="ms-4">
                              {cart.deletingLoading.isLoading &&
                              cart.deletingLoading.id === obj.id ? (
                                <div
                                  className="spinner-grow spinner-grow-sm text-danger"
                                  role="status"
                                ></div>
                              ) : (
                                <FaTrashAlt
                                  onClick={() => handleDelete(obj.id)}
                                  className="text-danger cursor-pointer"
                                />
                              )}
                            </span>
                          </td>
                          <td>{obj.get_total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <Link to="/checkout/" className="btn btn-warning">
                        Continue to checkout
                      </Link>
                    </div>
                    <div>
                      <div className="mb-2 fw-bold">
                        Total price:{" "}
                        <span className="text-success">
                          {cart.order[0].get_total_price} Toman
                        </span>
                      </div>
                      <div className="fw-bold mb-2">
                        Total discount:{" "}
                        <span className="text-danger">
                          {cart.order[0].get_final_amount} Toman
                        </span>
                      </div>
                      <div className="fw-bold">
                        Final price:{" "}
                        <span className="text-success">
                          {cart.order[0].get_total_fianl_price} Toman
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h5 className="text-primary">Your cart is empty</h5>
                <p>
                  Do you want to shopping? <Link to="/">Shopping</Link>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
