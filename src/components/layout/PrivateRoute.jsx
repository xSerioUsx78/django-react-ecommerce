import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({component: Component, ...rest}) => {

  const auth = useSelector(state => state.auth);

  return (
    <Route
    {...rest} render={props => (
      auth.isAuthenticated 
      ? 
      <Component {...props} />
      :
      <Redirect to={`/login/?next=${props.location.pathname}`} />
    )}
    />
  )
};

export default PrivateRoute
