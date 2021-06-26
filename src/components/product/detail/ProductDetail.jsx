import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import requests from "../../../requests/requests";
import axios from "axios";
import globalAxios from "../../../axios/axios";
import Breadcrumb from "../../base/Breadcrumb";
import BottomSection from "./BottomSection";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import TopSection from "./TopSection";
import { scrollIntoTop } from "../../../utils/scroll";
import ProductDetailFooter from "./ProductDetailFooter";
import useWindowDimensions from "../../base/WindowResize";
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

  const { width } = useWindowDimensions();

  useEffect(() => {
    scrollIntoTop();
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
          <ProductDetailSkeleton />
        ) : (
          <TopSection
            product={product}
            addToCartLoading={addToCartLoading}
            variations={variations}
            handleVariationsChange={handleVariationsChange}
            handleAddToCart={handleAddToCart}
            windowWidth={width}
          />
        )}
        <BottomSection
          specifications={product.specifications}
          description={product.description}
          loading={loading}
        />
        {width <= 767 && (
          <ProductDetailFooter
            product={product}
            addToCartLoading={addToCartLoading}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
