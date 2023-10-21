import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import style from "./LoginRegisterBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginBar() {
  const { logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);


  const userIsAuthenticated =
    isAuthenticated || localStorage.getItem("token") !== null;
  const cartProducts = useSelector((state) => state.cartProducts);

  let cartArray = [];

  if (cartProducts.length > 0) {
    cartArray = cartProducts.reduce((result, product) => {
      const existingProduct = result.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        result.push({
          id: product.id,
          quantity: 1,
        });
      }
      return result;
    }, []);
  }

  const cartToDispatch = { products: cartArray };

  const handleLogout = () => {
    toast.info("Cerrando Sesión", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    dispatch(logOut());
    localStorage.removeItem("cartId");
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Navbar className={style.nav} expand="lg">
      <div className={style.container}>
        <Nav className="mr-auto"></Nav>
        <Nav style={{ marginLeft: "auto" }}>
          {!userIsAuthenticated && (
            <>
              <Link to="/register">
                <Button variant="dark" className={style.buttonLogin}>
                  Registrate
                </Button>
              </Link>
              <Link to="/logIn">
                <Button variant="dark" className={style.button}>
                  Log In
                </Button>
              </Link>
            </>
          )}
          {userIsAuthenticated && (
            <div className={style.userInfo}>
              {/* <img src={loggedUser.avatar} alt="User Avatar" /> */}
              {/* <span className={style.userName}>{loggedUser.user_name}</span> */}
              <Button onClick={handleLogout} variant="dark">
                Log Out
              </Button>
            </div>
          )}
          </Nav>
      </div>
    </Navbar>
  );
}

export default LoginBar;
