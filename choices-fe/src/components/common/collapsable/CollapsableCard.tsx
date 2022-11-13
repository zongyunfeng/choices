import React, {useState} from "react";
import styles from "./CollapsableCard.module.scss";
import {CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, HolderOutlined} from "@ant-design/icons";
import FadeInOut from "../../FadeInOut/FadeInOut";

interface CollapsableCardProp {
    collapseIcon?: React.ReactNode
    expandIcon?: React.ReactNode
    closeIcon?: React.ReactNode
    headerContent?: React.ReactNode
    children: React.ReactNode
    onClose?: () => void
    style?: React.CSSProperties
}

const CollapsableCard: React.FC<CollapsableCardProp> = ({
                                                            collapseIcon = <FullscreenExitOutlined/>,
                                                            expandIcon = <FullscreenOutlined/>,
                                                            closeIcon = <CloseOutlined/>,
                                                            headerContent,
                                                            children,
                                                            onClose,
                                                            style
                                                        }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <div className={styles.collapsable_card} style={style}>
            <div className={styles.collapsable_card_header}>
                <HolderOutlined/>
                {headerContent}
                <div className={styles.collapsable_card_header_operations}>
                    <div onClick={() => {
                        setCollapse(!collapse)
                    }}>{collapse ? expandIcon : collapseIcon}</div>
                    <div onClick={onClose} className={styles.collapsable_card_header_operations_close}>
                        {closeIcon}
                    </div>
                </div>
            </div>

            <FadeInOut show={!collapse}>
                {children}
            </FadeInOut>
        </div>
    )
}

export default React.memo(CollapsableCard);