import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { GET_VENUES } from "./Type";

const persistConfig = {
  key: "rootReducer",
  storage,
};

const initialState = {
  venue: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VENUES:
      return {
        ...state,
        venue: action.payload,
      };
  }
};

export default persistReducer(persistConfig, rootReducer);
