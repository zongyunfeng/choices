import OptionsTree from "./OptionsTree";
import {Provider} from "react-redux";
import {store} from "../store/store";
import styles from './Main.module.scss'
import ComputationPanel from "./ComputationPanel";

const Main=()=>{
    return(
        <div className={styles.container}>
            <OptionsTree/>
            <div className={styles.container_divider}/>
            <Provider store={store}>
                <ComputationPanel/>
            </Provider>
        </div>
    )
}

export default Main;