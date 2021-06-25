import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import requests from "../../../requests/requests";
import axios from "axios";
import globalAxios from "../../../axios/axios";
import Breadcrumb from "../../base/Breadcrumb";
import BottomSection from "./BottomSection";
import Button from "../../base/Button";
import "../../../static/layout/css/productDetail.css";

const ProductDetail = ({ match }) => {
  const id = match.params.id,
    slug = match.params.slug;

  const history = useHistory();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variations, setVariations] = useState();
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await globalAxios.get(requests.getProductURL(id, slug));
        let _data = res.data;
        setProduct(_data);
        const variationData = {};
        _data.variations.forEach((obj) => {
          variationData[obj.name] = obj.item_variations[0].id;
        });
        setVariations(variationData);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    getProduct();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    return () => {
      source.cancel("axios request cancelled");
    };
  }, [id, slug]);

  const handleVariationsChange = (e) => {
    const { name, value } = e.target;
    setVariations({ ...variations, [name]: parseInt(value) });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (auth.isAuthenticated) {
      const data = {
        color: variations.Color,
        size: variations.Size,
      };
      try {
        setAddToCartLoading(true);
        const access = auth.token.access;
        const config = {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        };
        const res = await globalAxios.post(
          requests.addToCartURL(id, slug),
          data,
          config
        );
        dispatch({
          type: "INCREASE_CART_COUNT",
          payload: res.data.cart_count,
        });
        history.push("/cart/");
      } catch (e) {
        console.log(e.response.data);
      } finally {
        setAddToCartLoading(false);
      }
    } else {
      history.push(`/login/?next=/product/${product.id}/${product.slug}/`);
    }
  };

  return (
    <div className="product-detail-page mt-4">
      <div className="container">
        <Breadcrumb title={product.title} />
        {loading ? (
          <div className="row mb-4">
            <div className="col-lg-8 col-md-6 col-sm-12">
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
                        <Skeleton
                          className="mb-2 d-block"
                          count={1}
                          width={55}
                        />
                        <Skeleton
                          className="me-2 mb-1"
                          count={6}
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
              <form>
                <Skeleton count={1} width={100} height={35} />
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="row mb-4">
              <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="product-detail">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="info">
                        <div className="title mb-4">
                          <h1 className="h3">{product.title}</h1>
                        </div>
                        <div className="img">
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
                                    <option
                                      key={iv.id}
                                      id={iv.id}
                                      value={iv.id}
                                    >
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
                                    <span className="color-name">
                                      {iv.name}
                                    </span>
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
              <div className="col-lg-4 col-md-6 col-sm-12">
                <form onSubmit={handleAddToCart} method="POST">
                  {addToCartLoading ? (
                    <Button
                      className="warning"
                      text="Adding to cart"
                      type="button"
                      loading={true}
                    />
                  ) : (
                    <Button
                      className="warning"
                      text="Add to cart"
                      type="submit"
                      loading={false}
                    />
                  )}
                </form>
              </div>
            </div>
          </>
        )}
        <BottomSection
          specifications={product.specifications}
          description={product.description}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
