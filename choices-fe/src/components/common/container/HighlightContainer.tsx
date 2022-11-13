import React from "react";

interface HighlightContainerProp {
    /**
     * custom styles
     */
    style?: React.CSSProperties
    /**
     * indicate if the container should in highlight status
     */
    isHighlight: boolean
    children: React.ReactNode
    /**
     * the style that applied when in highlight status
     */
    highlightStyle: React.CSSProperties
}

const HighlightContainer: React.FC<HighlightContainerProp> = ({style, isHighlight, children, highlightStyle}) => {
    const ultraStyle = isHighlight ? {...style, ...highlightStyle} : style
    return (
        <div style={ultraStyle}>
            {children}
        </div>
    )
}

export default React.memo(HighlightContainer)