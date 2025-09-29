import {combineReducers} from "@reduxjs/toolkit";
import {layoutSlice} from "app/layout";


export const RootReducer = combineReducers({
    layout: layoutSlice.reducer,
})