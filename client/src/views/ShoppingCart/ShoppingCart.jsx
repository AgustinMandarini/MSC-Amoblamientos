import style from "./ShoppingCart.module.css";
import CartProductContainer from "../../components/CartProductContainer/CartProductContainer";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../redux/actions";
import React, { useEffect } from "react";
import { getLocalStorageCart } from "../../components/LocalStorage/LocalStorageFunctions";
import { useState } from "react";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  const localStorage = useSelector((state) => state.localStorage);
  const [localStorageCart, setLocalStorageCart] = useState([]);

  useEffect(() => {
    const cartFromLocalStorage = getLocalStorageCart();
    setLocalStorageCart(cartFromLocalStorage);
  }, []);

  const cartArray = cartProducts.reduce((result, product) => {
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
  const cartToDispatch = { products: cartArray };
  const postCartHandler = () => {
    dispatch(postCart(cartToDispatch));
  };
  console.log(localStorage);
  return (
    <div className={style.background}>
      <CartProductContainer />
      <button className={style.buttonComprar} onClick={postCartHandler}>
        Comprar!
      </button>
    </div>
  );
};

export default ShoppingCart;