import {useRef, useState} from "react";
import {useDrop} from "ahooks";
import styles from './ComputationPanel.module.scss';

function ComputationPanel() {
    const [isHovering, setIsHovering] = useState(false);
    const [opt, setOpt] = useState('')
    const dropRef = useRef(null);

    useDrop(dropRef, {
        onText: (text, e) => {
            setOpt(text)
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