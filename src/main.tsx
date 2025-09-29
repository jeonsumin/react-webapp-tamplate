import {createRoot} from 'react-dom/client'
import 'app/style/index.css'
import {App} from "app/index.tsx";

createRoot(document.getElementById('root')!).render(<App/>);
