import React from "react";

interface HighlightContainerProp {
    style?: React.CSSProperties
    isHighlight: boolean
    children: React.ReactNode
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