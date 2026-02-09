import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    component: "mobile",
    headerComponentName: undefined,
    routeName: undefined,
    hasFooter: true,
    hasHeader: true,
    referrer: undefined,
    isAndroid: false,
    isApple: false,
    isApp: false,
    appNo: ''
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setMobileHeader: (state: any, action: PayloadAction<any>) => {
            const payload = action.payload || {
                headerComponentName: undefined,
                routeName: undefined,
                hasFooter: true,
                referrer: undefined
            };
            state.headerComponentName = payload.headerComponentName;
            state.routeName = payload.routeName;
            state.hasFooter = payload.hasFooter !== undefined ? payload.hasFooter : true; // hasFooter가 payload에 없으면 기본값 true
            state.hasHeader = payload.hasHeader !== undefined ? payload.hasHeader : true; // hasFooter가 payload에 없으면 기본값 true
            state.referrer = payload.referrer;
        }
    }
})


export const layoutState = (state: RootState) => state.layout;
export const {setMobileHeader} = layoutSlice.actions;