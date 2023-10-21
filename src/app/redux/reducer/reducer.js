import {
  POST_PRODUCTS,
  GET_SUPPLIERS,
  POST_SUPPLIERS,
  GET_BY_ID,
  GET_ALL_PRODUCTS,
  DELETE_DETAIL,
  ORDER_BY,
  FILTER_BY_GROUP,
  GET_TAGS,
  GET_NAMES,
  FILTER_BY_SUPPLIERS,
  CREDENTIAL,
  USERCREDENTIALS,
  GET_USER_BY_EMAIL,
  POST_USERS,
  POST_TAG,
  POST_REVIEW,
  GET_REVIEW,
  GET_REVIEW_BY_ID,
  GET_RUBRO,
  GET_ALL_CART_ITEM_PRODUCTS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  POST_SALE,
  DELETE_LOGIC_PRODUCT,
  DELETE_LOGIC_SUPPLIER,
  DELETE_LOGIC_TAG,
  DELETE_LOGIC_RUBRO,
  UPDATE_PRODUCT,
  PUT_USERS
} from "../actions/actionsTypes";

const initialState = {
  allProducts: [],
  products: [],
  allSuppliers: [],
  allCartItems: [],
  allUsers: [],
  etiquetas: [],
  productDetail: [],
  user: {},
  credential_user: {},
  estado: false,
  suppliers: [],
  rubro: [],
  cartItems: [],
  sales: [],
  detailSale: [],
  review: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        allSuppliers: action.payload,
        suppliers: action.payload,
      };

    case POST_SUPPLIERS:
      return {
        ...state,
        allSuppliers: [...state.allSuppliers, action.payload],
        suppliers: [...state.suppliers, action.payload],
      };
    case POST_USERS:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };

    case PUT_USERS:
      return {
        user: action.payload,
      };

    case CREDENTIAL:
      return {
        ...state,
        estado: action.payload,
      };

    case USERCREDENTIALS:
      return {
        ...state,
        credential_user: action.payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        user: action.payload,
      };
    case POST_PRODUCTS:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
        products: [...state.products, action.payload],
      };

    case GET_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };
    case DELETE_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      };
    case GET_NAMES:
      return {
        ...state,
        products: action.payload,
      };
    case POST_TAG:
      return {
        ...state,
        etiquetas: [...state.etiquetas, action.payload],
      };
    case ORDER_BY:
      let productCopy = [...state.products];
      let ordenamiento;

      switch (action.payload) {
        case "All":
          productCopy = [...state.allProducts];
          break;
        case "A-Z":
          ordenamiento = productCopy.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          break;
        case "Z-A":
          ordenamiento = productCopy.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          break;
        case "MenorPrecio":
          ordenamiento = productCopy.sort(function (a, b) {
            return a.price - b.price;
          });
          break;
        case "MayorPrecio":
          ordenamiento = productCopy.sort(function (a, b) {
            return b.price - a.price;
          });
          break;

        default:
          ordenamiento = productCopy;
          break;
      }
      return {
        ...state,
        products: ordenamiento,
      };

    case FILTER_BY_GROUP:
      let aux = [];
      let filtrado;
      if (action.payload) {
        aux = state.products;
        filtrado = aux.filter((e) => {
          return e.group?.includes(action.payload);
        });
        console.log(filtrado);
      }
      return {
        ...state,
        products: filtrado,
      };
    case FILTER_BY_SUPPLIERS:
      let aux1 = [];
      let filtradoSup;
      if (action.payload) {
        aux1 = state.products;
        filtradoSup = aux1.filter((e) => {
          return e.supplierName?.includes(action.payload);
        });
        console.log(filtradoSup);
      }
      return {
        ...state,
        products: filtradoSup,
      };

    case GET_TAGS:
      return {
        ...state,
        etiquetas: action.payload,
      };
    case GET_RUBRO:
      return {
        ...state,
        rubro: action.payload,
      };

    case CART_ADD_ITEM: {
      let isAdded = false;

      const count = state.cartItems.filter(
        (item) => item.ID === action.payload.ID
      );

      if (count.length === 0) {
        if (parseInt(action.payload.Qty) > parseInt(action.payload.stock)) {
          isAdded = false;
        } else {
          isAdded = true;
        }
      } else {
        if (parseInt(count.length + 1) > parseInt(action.payload.stock)) {
          isAdded = false;
        } else {
          isAdded = true;
        }
      }

      console.log(isAdded);

      if (isAdded) {
        return {
          ...state,
          allCartItems: [...state.allCartItems, action.payload],
          cartItems: [...state.cartItems, action.payload],
        };
      } else {
        const allCartItemsConNuevaClave = state.allCartItems.map((item) => ({
          ...item,
          error: "error not enought stock",
        }));
        return {
          ...state,
          allCartItems: allCartItemsConNuevaClave,
          cartItems: allCartItemsConNuevaClave,
        };
      }
    }

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        allCartItems: state.allCartItems.filter(
          (item) => item.ID !== action.payload
        ),
        cartItems: state.cartItems.filter((item) => item.ID !== action.payload),
      };
    }

    case GET_ALL_CART_ITEM_PRODUCTS:
      return {
        ...state,
        allCartItems: action.payload,
        cartItems: action.payload,
      };

    case DELETE_LOGIC_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload.id
            ? { ...product, isActive: false }
            : product
        ),
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, isActive: false }
            : product
        ),
      };

    case DELETE_LOGIC_SUPPLIER:
      return {
        ...state,
        allSuppliers: state.allSuppliers.map((supplier) =>
          supplier.id === action.payload.id
            ? { ...supplier, isActive: false }
            : supplier
        ),
      };

    case DELETE_LOGIC_TAG:
      return {
        ...state,
        etiquetas: state.etiquetas.map((tag) =>
          tag.id === action.payload.id ? { ...tag, isActive: false } : tag
        ),
      };
    case "GET_ALL_SALES_SUCCESS":
      return {
        ...state,
        sales: action.payload,
      };
    case DELETE_LOGIC_RUBRO:
      return {
        ...state,
        rubro: state.rubro.map((rub) =>
          rub.id === action.payload.id ? { ...rub, isActive: false } : rub
        ),
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
        products: [...state.products, action.payload],
      };
    case POST_REVIEW:
      return {
        ...state,
        review: [...state.review, action.payload],
      };
    case GET_REVIEW:
      return {
        ...state,
        review: action.payload,
      };
    case GET_REVIEW_BY_ID:
      return {
        ...state,
        review: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
