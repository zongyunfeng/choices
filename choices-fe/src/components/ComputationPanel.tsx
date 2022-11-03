import {useRef, useState} from "react";
import {useDrop} from "ahooks";
import './ComputationPanel.css';

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
        <div className={'computation-panel'}>
            <div ref={dropRef} style={{
                border: '1px dashed #e8e8e8',
                padding: 16,
                textAlign: 'center',
                width: '300px',
                height: '300px'
            }}>
                {isHovering ? 'release here' : 'drop here'}
            </div>
            <div>
                {opt}
            </div>
        </div>
    );
}

export default ComputationPanel;