import {
  GET_BY_ID,
  GET_SUPPLIERS,
  POST_SUPPLIERS,
  GET_ALL_PRODUCTS,
  DELETE_DETAIL,
  ORDER_BY,
  FILTER_BY_GROUP,
  GET_TAGS,
  GET_NAMES,
  POST_USERS,
  CREDENTIAL,
  GET_USER_BY_EMAIL,
  POST_TAG,
  FILTER_BY_SUPPLIERS,
  POST_PRODUCTS,
  GET_RUBRO,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  GET_ALL_CART_ITEM_PRODUCTS,
  POST_SALE,
  DELETE_LOGIC_PRODUCT,
  DELETE_LOGIC_SUPPLIER,
  DELETE_LOGIC_TAG,
  DELETE_LOGIC_RUBRO,
  UPDATE_PRODUCT,
  POST_REVIEW,
  GET_REVIEW,
  GET_REVIEW_BY_ID,
  PUT_USERS
} from "./actionsTypes";
import axios from "axios";

export const getSuppliers = () => {
  return async (dispatch) => {
    try {
      const response = await axios("/api/suppliers");
      return dispatch({
        type: GET_SUPPLIERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postSuppliers = (supplier) => {
  //console.log(supplier);
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/suppliers", supplier);
      return dispatch({
        type: POST_SUPPLIERS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postUsers = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      const response = await axios.post("/api/user", user);
      return dispatch({
        type: POST_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const putUsers = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      const response = await axios.put("/api/user", user);
      return dispatch({
        type: PUT_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products?id=${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getUserByEmail = (emailUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/user?emailUser=${emailUser}`);
      return dispatch({
        type: GET_USER_BY_EMAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const credential = (emailUser, passwordUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `/api/user?emailUser=${emailUser}&passwordUser=${passwordUser}`
      );
      console.log(data);
      return dispatch({
        type: CREDENTIAL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const detailDelete = () => {
  return {
    type: DELETE_DETAIL,
    payload: {},
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const postProducts = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      return dispatch({
        type: POST_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderBy = (payload) => {
  return {
    type: ORDER_BY,
    payload,
  };
};

export const filterByProd = (payload) => {
  return {
    type: FILTER_BY_GROUP,
    payload,
  };
};

export const cartAddItem = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products?id=${payload.ID}`);
      let stock = data.stock;
      return dispatch({
        type: CART_ADD_ITEM,
        payload: { ...payload, stock },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cartRemoveItem = (payload) => {
  return {
    type: CART_REMOVE_ITEM,
    payload,
  };
};

export const getAllCartItems = () => {
  return {
    type: GET_ALL_CART_ITEM_PRODUCTS,
    payload,
  };
};

export const filterBySuppliers = (payload) => {
  return {
    type: FILTER_BY_SUPPLIERS,
    payload,
  };
};

export const getTags = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/tag");
      const filteredData = data.filter((item) => item.type === "group");
      return dispatch({
        type: GET_TAGS,
        payload: filteredData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRubro = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/tag");
      const filterRubro = data.filter((item) => item.type === "rubro");

      return dispatch({
        type: GET_RUBRO,
        payload: filterRubro,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductByName = (name) => {
  return async (dispatch) => {
    try {
      console.log(name);
      const { data } = await axios.get(`/api/products?name=${name}`);
      console.log(data, "eeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      return dispatch({
        type: GET_NAMES,
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: GET_NAMES,
        payload: [],
      });
    }
  };
};

export const postTags = (tag) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/tag", tag);
      return dispatch({
        type: POST_TAG,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postSale = (cart) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/sales", cart);
      return dispatch({
        type: POST_SALE,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: POST_SALE,
        payload: error.message,
      });
    }
  };
};

export const updateProducts = (input) => {
  return async (dispatch) => {
    try {
      const response = await axios.put("/api/products", input);
      return dispatch({
        type: UPDATE_PRODUCT,
        payñoad: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const deleteLogicProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete("/api/products", {
        data: { id, permanently: false },
      });
      return dispatch({
        type: DELETE_LOGIC_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getAllSales = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/sales");
    console.log(response);
    const salesData = response.data;
    dispatch({
      type: "GET_ALL_SALES_SUCCESS",
      payload: salesData,
    });
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
  }
};
export const deleteLogicTag = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete("/api/tag", {
        data: { id, permanently: false },
      });
      return dispatch({
        type: DELETE_LOGIC_TAG,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteLogicRubro = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete("/api/tag", {
        data: { id, permanently: false },
      });
      return dispatch({
        type: DELETE_LOGIC_RUBRO,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteLogicSupplier = (id_suppliers) => {
  return async (dispatch) => {
    try {
      const dataToSend = {
        id_suppliers,
        permanently: false,
      };

      const response = await axios.delete("/api/suppliers", {
        data: dataToSend,
      });

      if (response && response.data) {
        dispatch({
          type: DELETE_LOGIC_SUPPLIER,
          payload: response.data,
        });
      } else {
        console.error("La respuesta DELETE no contiene datos válidos.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  };
};
export const postReview = (review) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("api/Review", review);
      return dispatch({
        type: POST_REVIEW,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getReviewById = (idReview) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`
            /api/Review?idReview=${idReview}`);
      return dispatch({
        type: GET_REVIEW_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getReviews = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/Review");
      return dispatch({
        type: GET_REVIEW,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
