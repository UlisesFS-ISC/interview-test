import { List, Map } from "immutable";

const initialState = {
  likes: new Map(),
  dataLoadFlag: false,
  serviceErrorFlag: false,
  message: null
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_FLAG": {
      return { ...state, dataLoadFlag: action.dataLoadFlag };
    }

    case "SET_LIKES_DATA": {
      let list = new List(action.data);
      let groupedByProductIDMap = list.groupBy(
        likeEntry => likeEntry.productId
      );
      return {
        ...state,
        dataLoadFlag: true,
        likes: groupedByProductIDMap
      };
    }

    case "SUBMIT_LIKE_SUCCESS": {
      let likeEntriesAfterUnlike;
      let productId = action.likeEntry.productId;
      let likeEntriesForProduct = state.likes.get(
        action.likeEntry.productId,
        null
      );

      if (likeEntriesForProduct === null) {
        likeEntriesForProduct = state.likes.set(
          productId,
          new List([action.likeEntry])
        );
      } else if (!action.likedByUser) {
        likeEntriesForProduct = state.likes.set(
          productId,
          likeEntriesForProduct.push(action.likeEntry)
        );
      } else {
        likeEntriesAfterUnlike = likeEntriesForProduct.filter(item => {
          return item.userName !== action.likeEntry.userName;
        });
        likeEntriesForProduct = state.likes.set(
          productId,
          likeEntriesAfterUnlike
        );
      }
      return {
        ...state,
        likes: likeEntriesForProduct
      };
    }

    default:
      return state;
  }
};

export default ProductReducer;
