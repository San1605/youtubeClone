import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import chatSlice from "./chatSlice";
import SearchSlice from "./SearchSlice";

const store = configureStore({
    reducer:{
        app: appSlice,
        search:SearchSlice,
        chat:chatSlice
    }
})

export default store