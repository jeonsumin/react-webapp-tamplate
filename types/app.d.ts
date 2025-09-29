declare global {
    declare type RootState = import('../src/app/store/store').RootState
    declare type AppDispatch = import('../src/app/store/store').AppDispatch
}
export {}
