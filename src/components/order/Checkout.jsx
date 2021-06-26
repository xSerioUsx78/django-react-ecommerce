import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaAngleRight,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaPlus,
} from "react-icons/fa";
import { authAxios } from "../../axios/axios";
import requests from "../../requests/requests";
import AddressForm from "./AddressForm";
import DefaultAddress from "./DefaultAddress";
import AllAddresses from "./AllAddresses";
import SideBar from "./SideBar";
import CartSkeleton from "./CartSkeleton";
import { scrollIntoTop } from "../../utils/scroll";
import "../../static/layout/css/checkout.css";

const Checkout = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [showAddreses, setShowAddresses] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState({});
  const addressInitialState = {
    state: "",
    city: "",
    district: "",
    postal_address: "",
    plaque: "",
    unit: "",
    postal_code: "",
    recipients_first_name: "",
    recipients_last_name: "",
    national_code: "",
    phone_number: "",
  };
  const [address, setAddress] = useState(addressInitialState);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    scrollIntoTop();
    const fetchAddresses = async () => {
      try {
        const res = await authAxios(auth.token).get(requests.addressesURL);
        const data = res.data;
        setAddresses(data);
        if (data.length > 0) {
          const defaultObj = res.data.filter((obj) => obj.default === true);
          setDefaultAddress(defaultObj[0]);
        }
      } catch (e) {
        console.log(e.response);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    return () => {
      source.cancel("axios request cancelled");
    };
  }, [auth.token]);

  const handleShowAddresses = () => {
    setShowAddresses(!showAddreses);
  };

  const handleAddressFormChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleAddressFormSubmit = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    try {
      const data = Object.assign({}, address);
      if (data.unit === "") {
        data.unit = null;
      }
      const res = await authAxios(auth.token).post(
        requests.addNewAddressURL,
        data
      );
      if (addresses.length > 0) {
        let objIndex =
          addresses.length > 0 &&
          addresses.findIndex((obj) => obj.default === true);
        let cAddresses = [...addresses];
        cAddresses[objIndex].default = false;
        setAddresses(cAddresses);
      }
      setAddresses([res.data, ...addresses]);
      setDefaultAddress(res.data);
      resetAddressState();
    } catch (e) {
      console.log(e.response.data);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSetAddressAsDefault = async (pk, i) => {
    setFormLoading(true);
    try {
      await authAxios(auth.token).post(requests.setAddressAsDefaultURL, { pk });
      const cAddresses = [...addresses];
      let oldDefaultIndex = addresses.findIndex((obj) => obj.default === true);
      cAddresses[oldDefaultIndex].default = false;
      cAddresses[i].default = true;
      setAddresses(cAddresses);
      setDefaultAddress(cAddresses[i]);
    } catch (e) {
      console.log(e);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAddress = async (pk) => {
    setFormLoading(true);
    try {
      const res = await authAxios(auth.token).post(requests.deleteAddressURL, {
        pk,
      });
      const cAddresses = addresses.filter((obj) => obj.id !== pk);
      if (res.data.pk) {
        let objIndex = cAddresses.findIndex((obj) => obj.id === res.data.pk);
        cAddresses[objIndex].default = true;
      }
      setAddresses(cAddresses);
    } catch (e) {
      console.log(e);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateAddress = (pk) => {
    const obj = addresses.filter((obj) => obj.id === pk)[0];
    if (obj.unit === null) {
      obj.unit = "";
    }
    setAddress(obj);
  };

  const resetAddressState = () => {
    setAddress(addressInitialState);
  };

  const handleAddressFormUpdate = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    try {
      const data = Object.assign({}, address);
      if (data.unit === "") {
        data.unit = null;
      }
      const res = await authAxios(auth.token).post(
        requests.updateAddressURL,
        data
      );
      const cAddresses = [...addresses];
      const objIndex = cAddresses.findIndex((obj) => obj.id === res.data.id);
      cAddresses[objIndex] = res.data;
      setAddresses(cAddresses);
      if (res.data.default) {
        setDefaultAddress(res.data);
      }
    } catch (e) {
      console.log(e.response.data);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSetingAddress = async () => {
    setFormLoading(true);
    if (Object.keys(defaultAddress).length > 0) {
      try {
        await authAxios(auth.token).post(requests.setAddressToOrderURL, null);
        history.push("/payment/");
      } catch (e) {
        console.log(e.response.data);
      } finally {
        setFormLoading(false);
      }
    } else {
      console.log("you should add error to the user");
      setFormLoading(false);
    }
  };

  if (!auth.isAuthenticated) {
    return <Redirect to="/login/?next=/checkout/" />;
  }

  if (cart.order === null) {
    return (window.location.href = "/");
  }

  return (
    <div className="order-checkout-page mt-4">
      <div className="container-fluid pe-4 ps-4">
        {loading ? (
          <CartSkeleton />
        ) : addresses.length > 0 ? (
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12 mb-4">
              <div className="order-address__section order-cart__shadow border mb-4 p-4 rounded-3">
                {!showAddreses ? (
                  <DefaultAddress
                    address={defaultAddress}
                    showAddress={handleShowAddresses}
                    FaUser={<FaUser className="me-2 text-secondary" />}
                    FaAngleRight={<FaAngleRight className="mr-2" />}
                  />
                ) : (
                  <>
                    <AllAddresses
                      addresses={addresses}
                      setAddress={handleSetAddressAsDefault}
                      deleteAddress={handleDeleteAddress}
                      updateAddress={handleUpdateAddress}
                      FaUser={<FaUser className="me-2 text-secondary" />}
                      FaTimes={
                        <FaTimes
                          onClick={handleShowAddresses}
                          className="cursor-pointer float-end"
                          size="20"
                        />
                      }
                      FaEnvelope={
                        <FaEnvelope className="me-2 text-secondary" />
                      }
                      FaPhone={<FaPhone className="me-2 text-secondary" />}
                      FaPlus={<FaPlus size="20" />}
                    />
                    <AddressForm
                      onChange={handleAddressFormChange}
                      onSubmit={handleAddressFormSubmit}
                      resetAddressState={resetAddressState}
                      address={address}
                      isLoading={formLoading}
                      isHidden={true}
                      modalTitle="Add a new address"
                      id="addAddress"
                      prefix="create"
                    />
                    <AddressForm
                      onChange={handleAddressFormChange}
                      onSubmit={handleAddressFormUpdate}
                      resetAddressState={resetAddressState}
                      address={address}
                      isLoading={formLoading}
                      isHidden={true}
                      modalTitle="Change your address"
                      id="updateAddress"
                      prefix="update"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <SideBar cart={cart} settingAddress={handleSetingAddress} />
            </div>
          </div>
        ) : (
          <AddressForm
            onChange={handleAddressFormChange}
            onSubmit={handleAddressFormSubmit}
            address={address}
            isLoading={formLoading}
            isHidden={false}
            modalTitle="Add your address"
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
