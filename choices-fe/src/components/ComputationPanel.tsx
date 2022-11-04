import {useRef, useState} from "react";
import {useDrop} from "ahooks";
import styles from './ComputationPanel.module.scss';
import {getComputationItem} from "../service/OptionsApi";

const fetchComputationItem=async (id:string)=>{
    const computationItemData=await getComputationItem(id);
    const computationItem=computationItemData.data.data
    console.info({computationItem});
}

function ComputationPanel() {
    const [isHovering, setIsHovering] = useState(false);
    const [opt, setOpt] = useState('')
    const dropRef = useRef(null);

    useDrop(dropRef, {
        onText: (text, e) => {
            setOpt(text)
            fetchComputationItem(text);
        },
        onDragEnter: () => setIsHovering(true),
        onDragLeave: () => setIsHovering(false)
    });



    return (
        <div className={styles.computation_container}>
            <div ref={dropRef} className={styles.computation_container_drop}>
                {isHovering ? 'release here' : 'drop here'}
            </div>
            <div>
                {opt}
            </div>
        </div>
    );
}

export default ComputationPanel;