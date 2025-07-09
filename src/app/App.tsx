import 'shared/base.css'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {RouterProvider} from "./provider/RouterProvider"
import {store} from './store'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider/>
        </Provider>
    </StrictMode>,
)
