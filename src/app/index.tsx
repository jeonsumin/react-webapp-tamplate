import {Provider} from "react-redux";
import {store} from "app/store/store.ts";
import {AppRouter} from "app/routes";

export const App = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}