import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/auth';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './components/layout/Index';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavBar from './components/layout/NavBar';
import ProductDetail from './components/product/detail/ProductDetail';
import Cart from './components/order/Cart';
import Checkout from './components/order/Checkout';
import ProductList from './components/product/list/ProductList';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path='/' component={Index} />
        <Route path='/register/' component={Register} />
        <Route path='/login/' component={Login} />
        <Route path="/product/:id/:slug/" component={ProductDetail}></Route>
        <Route path="/cart/" component={Cart}></Route>
        <Route path="/checkout/" component={Checkout}></Route>
        <Route exact path="/product/" component={ProductList}></Route>
      </div>
    </Router>
  );
}

export default App;
