import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import { AppRouter } from "views/app-router.tsx";
import {createRoot} from 'react-dom/client'
import 'shared/style/index.css'
import "shared/style/commons.css"

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);