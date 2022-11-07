import 'antd/dist/antd.css';
import './App.scss'
import OptionsTree from "./components/OptionsTree";
import {store} from "./store/store";
import {Provider} from "react-redux";
import DropZone from "./components/DropZone";

function App() {

    return (
        <div className="options-panel">
            <OptionsTree/>
            <Provider store={store}>
                <DropZone/>
            </Provider>
        </div>
    )
}

export default App
