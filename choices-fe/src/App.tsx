import 'antd/dist/antd.css';
import './App.scss'
import OptionsTree from "./components/OptionsTree";
import ComputationPanel from "./components/ComputationPanel";

function App() {

    return (
        <div className="options-panel">
            <OptionsTree/>
            <ComputationPanel/>
        </div>
    )
}

export default App
