import OptionsTree from "./OptionsTree";
import {Provider} from "react-redux";
import {store} from "../store/store";
import styles from './ComputationPanel.module.scss'
import ComputationGroup from "./ComputationGroup";
import {Divider} from "antd";

const ComputationPanel=()=>{
    return(
        <div className={styles.computation_panel}>
            <OptionsTree/>
            <div className={styles.computation_panel_divider}/>
            <Provider store={store}>
                <ComputationGroup/>
            </Provider>
        </div>
    )
}

export default ComputationPanel;