// const endpoint = "http://localhost:8000/";
const endpoint = "https://django-react-ecommerce-mn.herokuapp.com/";

const requests = {
    registerURL: `${endpoint}users/api/register/`,
    loginURL: `${endpoint}users/api/token/`,
    getUserURL: `${endpoint}users/api/user/`,
    getLatestProductsURL: `${endpoint}product/api/latest/`,
    fetchProductsURL: `${endpoint}product/api/product/`,
    searchProductsURL: `${endpoint}product/api/search/`,
    getProductURL: (id, slug) => `${endpoint}product/api/detail/${id}/${slug}/`,
    addToCartURL: (id, slug) => `${endpoint}order/api/add-to-cart/${id}/${slug}/`,
    fetchCartURL: `${endpoint}order/api/cart/`,
    increaseQuantityURL: `${endpoint}order/api/increase-quantity/`,
    decreaseQuantityURL: `${endpoint}order/api/decrease-quantity/`,
    removeFromCartURL: `${endpoint}order/api/remove-from-cart/`,
    addressesURL: `${endpoint}order/api/addresses/`,
    addNewAddressURL: `${endpoint}order/api/addresses/add/`,
    setAddressAsDefaultURL: `${endpoint}order/api/addresses/set/`,
    deleteAddressURL: `${endpoint}order/api/addresses/delete/`,
    updateAddressURL: `${endpoint}order/api/addresses/update/`,
    setAddressToOrderURL: `${endpoint}order/api/addresses/set-to-order/`,
}

export default requests