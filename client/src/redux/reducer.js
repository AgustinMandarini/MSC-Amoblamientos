import {
  GET_MUEBLES,
  GET_DETAIL,
  POST_MUEBLES,
  GET_PRODUCT_TYPE,
  GET_MUEBLE_NAME,
} from "./types";

const initialState = {
  muebles: [],
  allMuebles: [],
  detail: [],
  productType: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MUEBLES:
      return {
        ...state,
        muebles: action.payload,
        allMuebles: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case POST_MUEBLES:
      return {
        ...state,
        muebles: action.payload,
      };
    case GET_PRODUCT_TYPE:
      return {
        ...state,
        productType: action.payload,
      };

    case GET_MUEBLE_NAME:
      return {
        ...state,
        muebles: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
