//reducer.js
import {
  GET_PRODUCTS,
  GET_PRODUCTS_ADMIN,
  GET_ORDERS_ADMIN,
  GET_DETAIL,
  GET_CART_DETAIL,
  GET_USERS,
  POST_PRODUCT,
  GET_PRODUCT_TYPE,
  GET_PRODUCT_TYPE_BYID,
  GET_COLOR,
  GET_MATERIAL,
  GET_MATERIAL_BYID,
  GET_PRODUCT_BY_NAME,
  SET_IMAGE_URL,
  SET_SORT,
  SET_PRODUCTS_COPY,
  SET_PRODUCT_TYPE,
  SET_COLOR,
  SET_PRICE_RANGE,
  POST_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  DELETE_CART,
  POST_USER,
  LOGIN,
  LOGOUT,
  FETCH_USER_DATA,
  LOAD_CART_FROM_LOCAL_STORAGE,
  POST_CART,
  SET_MATERIAL,
  GET_CART,
  UPDATE_PRODUCT_COUNT_IN_CART,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  ADMIN_ENABLEDISABLE,
  POST_COLOR,
  POST_MATERIAL,
  POST_PRODUCTTYPE,
  SET_NAME,
  DELETE_CART_PRODUCT_DIRECT,
  EMPTY_CART,
  GET_COLOR_BYID,
  GET_CARTS,
  GET_REVIEWS,
  GET_REVIEW_BY_PRODUCT_ID,
  DELETE_REVIEW,
} from "./types";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  muebles: [],
  ordersAdmin: [],
  productsAdmin: [],
  allMuebles: [],
  detail: [],
  productType: [],
  sort: "allOptions",
  filter: {
    productType: "allOptions",
    color: "allOptions",
    price: ["allOptions"],
    material: "allOptions",
  },
  imageURL: null,
  colorState: [],
  materialState: [],
  nameState: null,
  cartProducts: [],
  localStorage: [],
  allUsers: [],
  userToken: null,
  loggedUser: null,
  cartTotal: 0,
  colorById: [],
  materialId: [],
  tipoDeProductoById: [],
  cartDetail: [],
  carts: [],
  totalReviews: [],
  reviews: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATERIAL:
      return {
        ...state,
        materialState: action.payload,
      };

    case GET_CARTS:
      return {
        ...state,
        cartsAdmin: action.payload,
      };

    case GET_MATERIAL_BYID:
      return {
        ...state,
        materialId: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        muebles: action.payload,
        allMuebles: action.payload,
      };

    case GET_PRODUCTS_ADMIN:
      return {
        ...state,
        productsAdmin: action.payload,
      };
    case GET_ORDERS_ADMIN:
      return {
        ...state,
        ordersAdmin: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_CART_DETAIL:
      return {
        ...state,
        cartDetail: action.payload,
      };
    case PUT_PRODUCT:
      return {
        ...state,
        muebles: action.payload,
      };

    case SET_IMAGE_URL:
      return {
        ...state,
        imageURL: action.payload,
      };

    case POST_PRODUCT:
      return {
        ...state,
        muebles: action.payload,
      };
    case GET_PRODUCT_TYPE:
      return {
        ...state,
        productType: action.payload,
      };

    case GET_PRODUCT_TYPE_BYID:
      return {
        ...state,
        tipoDeProductoById: action.payload,
      };
    case GET_COLOR:
      return {
        ...state,
        colorState: action.payload,
      };
    case GET_COLOR_BYID:
      return {
        ...state,
        colorById: action.payload,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        muebles: action.payload,
      };
    case GET_CART:
      const newProducts = action.payload.products.map((item) => {
        const mueble = state.muebles.find((m) => m.id === item.productId);
        if (mueble) {
          return {
            ...mueble,
            count: item.product_quantity,
          };
        }
        return mueble;
      });

      return {
        ...state,
        cartProducts: newProducts,
      };

    case POST_CART_PRODUCT:
      const productId = action.payload;
      // Busca el producto en el carrito actual
      const existingProductIndex = state.cartProducts
        .filter((product) => product && product.id !== undefined)
        .findIndex((product) => product.id === productId);

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, verifica si ha alcanzado la cantidad máxima de stock
        const existingProduct = state.cartProducts[existingProductIndex];
        if (existingProduct.count < existingProduct.stock) {
          // Si no ha alcanzado la cantidad máxima, incrementa su count
          const updatedCartProducts = [...state.cartProducts];
          updatedCartProducts[existingProductIndex].count += 1;
          return {
            ...state,
            cartProducts: updatedCartProducts,
          };
        } else {
          // Si ha alcanzado la cantidad máxima, muestra una notificación de toast
          toast.error(
            "Este producto ha alcanzado la cantidad máxima de stock",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000,
            }
          );
          return state;
        }
      } else {
        // Si el producto no existe en el carrito, agrégalo con count igual a 1
        const productToAdd = state.muebles.find(
          (mueble) => mueble.id === productId
        );

        if (productToAdd && productToAdd.stock > 0) {
          // Verifica si hay suficiente stock antes de agregar al carrito
          productToAdd.count = 1;
          return {
            ...state,
            cartProducts: [...state.cartProducts, productToAdd],
            cartTotal:
              state.cartTotal + action.payload.price * action.payload.quantity,
          };
        } else {
          // No hay suficiente stock para agregar el producto al carrito
          toast.error("Este producto ha alcanzado la cantidad máxima de stock", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
          return state;
        }
      }

    case DELETE_CART_PRODUCT:
      const productId2 = action.payload;
      const productToDelete = state.cartProducts
        .filter((product) => product && product.id !== undefined)
        .find((product) => product.id === productId2);

      if (!productToDelete) {
        return state; // No se hace nada si el producto no se encuentra
      }

      if (productToDelete.count <= 1) {
        // Si el count es menor o igual a 1, elimina el producto del carrito
        const updatedCartProducts = state.cartProducts
          .filter((item) => item && item.id !== undefined)
          .filter((product) => product.id !== productId2);

        // Actualiza el estado de Redux
        const newState = {
          ...state,
          cartProducts: updatedCartProducts,
        };

        // Actualiza el localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

        return newState;
      } else {
        // Si el count es mayor que 1, disminuye el count en 1
        const updatedCartProducts = state.cartProducts
          .filter((product) => product && product.id !== undefined)
          .map((product) =>
            product.id === productId2
              ? { ...product, count: product.count - 1 }
              : product
          );

        // Actualiza el estado de Redux
        const newState = {
          ...state,
          cartProducts: updatedCartProducts,
        };

        // Actualiza el localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

        return newState;
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        muebles: action.payload,
      };
    case DELETE_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cartProducts: [],
      };
    case LOAD_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cartProducts: action.payload, // Carga los productos del localStorage
      };
    case SET_SORT:
      return { ...state, sort: action.payload };

    case SET_NAME:
      return { ...state, nameState: action.payload };

    case SET_PRODUCT_TYPE:
      return {
        ...state,
        filter: { ...state.filter, productType: action.payload },
      };
    case SET_COLOR:
      return {
        ...state,
        filter: { ...state.filter, color: action.payload },
      };
    case SET_MATERIAL:
      return {
        ...state,
        filter: { ...state.filter, material: action.payload },
      };

    case SET_PRICE_RANGE:
      return {
        ...state,
        filter: {
          ...state.filter,
          price: action.payload.split(","),
        },
      };

    case SET_PRODUCTS_COPY:
      return {
        ...state,
        allMuebles: action.payload,
      };
    case POST_USER:
      return {
        ...state,
        newUser: action.payload,
      };

    case POST_COLOR:
      return {
        ...state,
        colorState: action.payload,
      };

    case POST_MATERIAL:
      return {
        ...state,
        materialState: action.payload,
      };

    case POST_PRODUCTTYPE:
      return {
        ...state,
        productType: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case LOGIN: {
      const { accessToken, user } = action.payload;
      return {
        ...state,
        userToken: accessToken,
        loggedUser: user,
      };
    }
    case LOGOUT:
      return {
        ...state,
        userToken: action.payload,
      };
    case FETCH_USER_DATA: {
      const { accessToken, user } = action.payload;
      return {
        ...state,
        userToken: accessToken,
        loggedUser: user,
      };
    }

    case POST_CART:
      return {
        ...state,
        localStorage: action.payload,
      };
    case ADMIN_ENABLEDISABLE:
      return {
        ...state,
        muebles: action.payload,
        enabled_product: action.payload.enabled_product,
      };

    case EMPTY_CART:
      return {
        ...state,
        cartProducts: [],
      };

    case DELETE_CART_PRODUCT_DIRECT: {
      const productId3 = action.payload;
      const productToDelete = state.cartProducts
        .filter((product) => product && product.id !== undefined)
        .find((product) => product.id === productId3);

      if (!productToDelete) {
        return state; // No se hace nada si el producto no se encuentra
      }

      if (productToDelete.count > 0) {
        // Solo si el contador es mayor que cero
        // Elimina el producto del carrito
        const updatedCartProducts = state.cartProducts
          .filter((product) => product && product.id !== undefined)
          .filter((product) => product.id !== productId3);

        // Actualiza el estado de Redux
        const newState = {
          ...state,
          cartProducts: updatedCartProducts,
        };

        // Actualiza el localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

        return newState;
      }
      // En caso contrario, no hagas nada y simplemente devuelve el estado actual
      return state;
    }
    case GET_REVIEW_BY_PRODUCT_ID:
      return {
        ...state,
        reviews: action.payload,
      };
    case GET_REVIEWS:
      return {
        ...state,
        totalReviews: action.payload,
      };
    case DELETE_REVIEW:
      const reviewIdToDelete = action.payload; // ID de la revisión a eliminar
      const updatedTotalReviews = state.totalReviews.filter(
        (review) => review.id !== reviewIdToDelete
      );

      return {
        ...state,
        totalReviews: updatedTotalReviews,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
