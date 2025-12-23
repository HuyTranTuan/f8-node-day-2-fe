import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

import { themeSlice } from "@/features/theme";
import { postsSlice } from "@/features/posts";
import { commentsSlice } from "@/features/comments";

const transforms = import.meta.env.DEV
  ? []
  : [
      encryptTransform({
        secretKey: "my-super-secrets-key",
        onError: function (error) {
          console.warn(error);
        },
      }),
    ];

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    postsSlice.reducerPath,
    commentsSlice.reducerPath,
    themeSlice.reducerPath,
  ],
  transforms,
};

// const authPersistConfig = {
//   key: authSlice.reducerPath,
//   storage,
//   blacklist: ["fetching"],
//   transforms,
// };

const rootReducer = combineReducers({
  // [authSlice.reducerPath]: persistReducer(authPersistConfig, authSlice.reducer),

  [postsSlice.reducerPath]: postsSlice.reducer,
  [commentsSlice.reducerPath]: commentsSlice.reducer,
  [themeSlice.reducerPath]: themeSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddlewares) => [
    ...getDefaultMiddlewares({
      serializableCheck: false,
    }),
  ],
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

window.store = store;

export { store, persistor };
