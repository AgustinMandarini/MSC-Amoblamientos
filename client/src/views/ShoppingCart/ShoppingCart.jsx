import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { emptyCart, newOrder } from "../../redux/actions";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_PUBLIC_MP_KEY = process.env.REACT_APP_PUBLIC_MP_KEY;
const CALLBACK_URL = process.env.REACT_APP_AUTH0_CALLBACK_URL;

const ShoppingCart = ({ show, handleClose, handleShow }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts) || [];
  const storage = useSelector((state) => state.localStorage);
  const newOrderValue = useSelector((state) => state.newOrder);
  const loggedUser = useSelector((state) => state.loggedUser);
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const userIsAuthenticated = localStorage.getItem("token") !== null;

  const [preferenceId, setPreferenceId] = useState(null);
  const [order, setOrder] = useState(null);

  initMercadoPago(REACT_APP_PUBLIC_MP_KEY);

  function transformCartProducts(cartProducts) {
    const productMap = {};

    cartProducts
      .filter((product) => product && product.id !== undefined)
      .forEach((product) => {
        const productId = product.id;
        if (!productMap[productId]) {
          productMap[productId] = {
            description: product.name,
            unit_price: product.price,
            total_price: product.price * product.count,
            quantity: product.count,
            currency_id: "ARS",
          };
        } else {
          productMap[productId].total_price += product.unit_price;
        }
      });

    const result = Object.values(productMap);
    return result;
  }

  const transformedProducts = transformCartProducts(cartProducts);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/cart/create_preference`,
        transformedProducts
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    if (userIsAuthenticated) {
      const id = await createPreference();
      if (id) {
        toast.info("Generando link de compra.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });

        setPreferenceId(id);
      }
    } else {
      history.push("/logIn");
      handleClose();
    }
  };

  return (
    handleShow && (
      <Offcanvas
        show={show}
        onHide={handleClose}
        className={style.cntnShoppingCart}
        placement="end"
      >
        <Offcanvas.Header className={style.Header}>
          <Offcanvas.Title className={style.cartTittle}>
            CARRITO
          </Offcanvas.Title>
          <button
            className={`${style.customCloseButton} close`}
            onClick={handleClose}
          >
            X
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartProductContainer />
          {cartProducts.length > 0 && (
            <button className={style.buttonComprar} onClick={handleBuy}>
              Comprar
            </button>
          )}
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </Offcanvas.Body>
      </Offcanvas>
    )
  );
};

export default ShoppingCart;
