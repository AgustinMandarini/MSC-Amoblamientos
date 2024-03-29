//actions.js
import {
  DELETE_CART_PRODUCT,
  GET_COLOR,
  GET_COLOR_BYID,
  GET_ORDERS_ADMIN,
  GET_DETAIL,
  GET_CART_DETAIL,
  GET_MATERIAL,
  GET_MATERIAL_BYID,
  GET_PRODUCTS,
  GET_PRODUCTS_ADMIN,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_TYPE,
  GET_USERS,
  POST_CART_PRODUCT,
  POST_PRODUCT,
  SET_COLOR,
  SET_IMAGE_URL,
  SET_PRICE_RANGE,
  SET_PRODUCTS_COPY,
  SET_PRODUCT_TYPE,
  SET_SORT,
  POST_USER,
  LOGIN,
  LOGOUT,
  FETCH_USER_DATA,
  LOAD_CART_FROM_LOCAL_STORAGE,
  POST_CART,
  SET_MATERIAL,
  GET_CART,
  DELETE_CART,
  UPDATE_CART,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  ADMIN_ENABLEDISABLE,
  POST_COLOR,
  POST_MATERIAL,
  POST_PRODUCTTYPE,
  SET_NAME,
  DELETE_CART_PRODUCT_DIRECT,
  EMPTY_CART,
  GET_PRODUCT_TYPE_BYID,
  POST_REVIEW,
  GET_REVIEW_BY_PRODUCT_ID,
  GET_CARTS,
  GET_REVIEWS,
  DELETE_REVIEW,
} from "./types";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getToken,
  removeToken,
  setToken,
} from "../components/LocalStorage/LocalStorageFunctions";

const apiUrl = process.env.REACT_APP_API_URL;
const detailUrl = process.env.REACT_APP_API_DETAIL_URL;

//products
export const getProducts = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${apiUrl}/product`);
    const product = apiData.data;
    return dispatch({
      type: GET_PRODUCTS,
      payload: product,
    });
  };
};

export const getCarts = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${apiUrl}/cart`);
    const carts = apiData.data;
    return dispatch({
      type: GET_CARTS,
      payload: carts,
    });
  };
};

export const getProductsAdmin = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${apiUrl}/product/admin`);
    const product = apiData.data;
    return dispatch({
      type: GET_PRODUCTS_ADMIN,
      payload: product,
    });
  };
};
export const getOrdersAdmin = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`${apiUrl}/order`);
    const order = apiData.data;
    return dispatch({
      type: GET_ORDERS_ADMIN,
      payload: order,
    });
  };
};

export const postProduct = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/product`, payload);
      const producto = response.data;
      if (response.status === 200) {
        dispatch({ type: POST_PRODUCT, payload: producto });
        toast.success("Producto Creado", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.href = `${detailUrl}/${producto.id}`;
        }, 3000);
      }
    } catch (error) {
      toast.error("No se pudo crear el producto", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const putProduct = (id, edit) => {
  return async (dispatch) => {
    console.log(id, edit);
    try {
      const response = await axios.put(`${apiUrl}/product/${id}`, edit);
      const product = response.data;
      dispatch({
        type: PUT_PRODUCT,
        payload: product,
      });
    } catch (error) {
      console.error("Error en la acción putProduct:", error);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${apiUrl}/product/${id}`);
      const eliminado = response.data;
      dispatch({
        type: DELETE_PRODUCT,
        payload: eliminado,
      });
    } catch (error) {
      console.error("Error en la acción putProduct:", error);
    }
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `${apiUrl}/product${name ? `?name=${name}` : ""}`
    );
    const nameid = apiData.data;
    return dispatch({
      type: GET_PRODUCT_BY_NAME,
      payload: nameid,
    });
  };
};
export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`${apiUrl}/product/${id}`);
      const detail = apiData.data;
      dispatch({
        type: GET_DETAIL,
        payload: detail,
      });
    } catch (error) {
      console.error("Error en la acción getDetail:", error);
    }
  };
};
export const getCartDetail = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`${apiUrl}/admin/ventas/${id}`);
      const cartDetail = apiData.data;
      dispatch({
        type: GET_CART_DETAIL,
        payload: cartDetail,
      });
    } catch (error) {
      console.error("Error en la acción getDetail:", error);
    }
  };
};

//types

export const getProductType = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/productType`);
      const productType = response.data;
      return dispatch({
        type: GET_PRODUCT_TYPE,
        payload: productType,
      });
    } catch (error) {
      alert("No se encontro un tipo de producto");
    }
  };
};
export const getProductTypeById = (productTypeId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}/productType/${productTypeId}`
      );
      const productType = response.data;
      return dispatch({
        type: GET_PRODUCT_TYPE_BYID,
        payload: productType,
      });
    } catch (error) {
      //alert("No se encontro un tipo de producto");
    }
  };
};
export const postProductType = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/productType`, payload);
      const productType = response.data;

      dispatch({ type: POST_PRODUCTTYPE, payload: productType });
    } catch (error) {
      alert("No se pudo crear el Material: ", error);
    }
  };
};

export const getColor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/color`);
      const color = response.data;
      return dispatch({
        type: GET_COLOR,
        payload: color,
      });
    } catch (error) {
      alert("No se encontraron los colores");
    }
  };
};

export const getColorById = (colorId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/color/${colorId}`);
      const color = response.data;
      return dispatch({
        type: GET_COLOR_BYID,
        payload: color,
      });
    } catch (error) {
      // alert("No se encontro el color");
    }
  };
};

export const postColor = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/color`, payload);
      const color = response.data;

      dispatch({ type: POST_COLOR, payload: color });
    } catch (error) {
      alert("No se pudo crear el color: ", error);
    }
  };
};

export const postMaterial = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/material`, payload);
      const material = response.data;

      dispatch({ type: POST_MATERIAL, payload: material });
    } catch (error) {
      alert("No se pudo crear el Material: ", error);
    }
  };
};

export const postUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/user`, payload);
      const user = response.data;
      if (response.status === 200) {
        dispatch({ type: POST_USER, payload: user });
        alert("Usuario Creado");
      }
    } catch (error) {
      console.log(`Error: ${error}. Ya existe un usuario con ese email`);
    }
  };
};
export const getMaterial = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/material`);
      const material = response.data;
      return dispatch({
        type: GET_MATERIAL,
        payload: material,
      });
    } catch (error) {
      alert("No se encontro el material");
    }
  };
};

export const getMaterialById = (materialId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/material/${materialId}`);
      const material = response.data;
      return dispatch({
        type: GET_MATERIAL_BYID,
        payload: material,
      });
    } catch (error) {
      // alert("No se encontro el material");
    }
  };
};
export const setSort = (payload) => {
  return { type: SET_SORT, payload };
};
export const setProductType = (payload) => {
  return { type: SET_PRODUCT_TYPE, payload };
};
export const setColor = (payload) => {
  return { type: SET_COLOR, payload };
};
export const setPriceRange = (payload) => {
  return { type: SET_PRICE_RANGE, payload };
};

//img

export const setImageURL = (imageURL) => {
  return {
    type: SET_IMAGE_URL,
    payload: imageURL,
  };
};

//

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/user`);
      const users = response.data;
      return dispatch({
        type: GET_USERS,
        payload: users,
      });
    } catch (error) {
      alert("No se encontraron usuarios");
    }
  };
};

export const login = (payload) => {
  const accessToken = payload.accessToken;
  return async function (dispatch) {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Asegúrate de tener el token aquí
        },
      });
      const user = response.data; //trae la info del usuario
      if (response.status === 200) {
        setToken(accessToken);
        //LOCALSTORAGE
        const userInfo = { userId: user.id, cartId: user.cartId };
        localStorage.setItem("user", JSON.stringify(userInfo));
        dispatch({
          type: LOGIN,
          payload: { userToken: accessToken, user: user },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("La contraseña es incorrecta o el usuario se encuentra bloqueado", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    removeToken();
    //LOCALSTORAGE
    localStorage.removeItem("user");
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };
};

export const fetchUserData = () => {
  return async (dispatch) => {
    const accessToken = getToken();
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axios.post(
        `${apiUrl}/user/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Asegúrate de tener el token aquí
          },
        }
      );

      const user = response.data;
      return dispatch({
        type: FETCH_USER_DATA,
        payload: { userToken: accessToken, user: user },
      });
    } catch (error) {
      removeToken();
      // Puedes manejar el error aquí si lo deseas.
    }
  };
};

//carrito
export const getCart = (cartId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/cart/${cartId}`);
      const cartData = response.data;

      // Actualiza el estado de Redux con la información del carrito
      dispatch({ type: GET_CART, payload: cartData });

      return cartData;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };
};
export const postCart = (cart) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${apiUrl}/cart`, cart);
      const payload = data.cartData;
      // Guardar la información en el LocalStorage
      console.log("ID que se crea y se almacena", payload.id);
      localStorage.setItem("cartId", payload.id);
      // localStorage.removeItem("cart");

      return dispatch({
        type: POST_CART,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCartProduct = (payload) => {
  return { type: POST_CART_PRODUCT, payload: payload };
};
export const deleteCartProduct = (payload) => {
  //NUNCA SE CONECTA AL BACK
  return { type: DELETE_CART_PRODUCT, payload: payload };
};

export const deleteCartProductDirect = (payload) => {
  return { type: DELETE_CART_PRODUCT_DIRECT, payload: payload };
};
export const deleteCart = (cartId) => {
  // borra todo el carro
  try {
    return async (dispatch) => {
      const { data } = await axios.post(`${apiUrl}/${cartId}`);
      const payload = data.data;

      return dispatch({
        type: DELETE_CART,
        payload: payload,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = (cartId, cart) => {
  return async (dispatch) => {
    try {
      await axios.put(`${apiUrl}/cart/${cartId}`, cart);

      // Si es necesario, puedes actualizar el estado de Redux con el carrito actualizado
      // actualmente el put esta devolviendo {"status":200,"data":null}. Pero si se actualiza el card
      dispatch({ type: UPDATE_CART, payload: cart });
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };
};

export const loadCartFromLocalStorage = (savedCart) => {
  return {
    type: LOAD_CART_FROM_LOCAL_STORAGE,
    payload: savedCart,
  };
};

export const setProductsCopy = (payload) => {
  return { type: SET_PRODUCTS_COPY, payload };
};

export const setMaterial = (payload) => {
  return { type: SET_MATERIAL, payload };
};

export const setName = (payload) => {
  return { type: SET_NAME, payload };
};

export const putEnableDisable = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.put(`${apiUrl}/product/enabledisable/${id}`);
      const putenable = apiData.data;
      dispatch({
        type: ADMIN_ENABLEDISABLE,
        payload: putenable,
      });
    } catch (error) {
      console.error("Error en la acción getDetail:", error);
    }
  };
};

export const emptyCart = () => {
  return { type: EMPTY_CART };
};
//reviews
export const createReview = (review) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/review`, review);
      const reviews = response.data;
      dispatch({ type: POST_REVIEW, reviews });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
};
export const getReviewByProductId = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/review/product/${productId}`);
      const data = response.data;
      dispatch({ type: GET_REVIEW_BY_PRODUCT_ID, payload: data });
    } catch (error) {
      console.error("No se encontraron reviews de este producto ", error);
    }
  };
};
export const getReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/review/`);
      const data = response.data;
      dispatch({ type: GET_REVIEWS, payload: data });
    } catch (error) {
      console.error("No se encontraron reviews de este producto ", error);
    }
  };
};
export const deleteReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${apiUrl}/review/${reviewId}`);
      const eliminado = response.data;
      dispatch({
        type: DELETE_REVIEW,
        payload: eliminado,
      });
    } catch (error) {
      console.error("Error en la acción putProduct:", error);
    }
  };
};
