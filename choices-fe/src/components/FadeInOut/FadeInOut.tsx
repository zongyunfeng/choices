import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {upFadeVariants} from "./config";

interface FadeInOutProp {
    show: boolean,
    children: React.ReactNode
}

const FadeInOut: React.FC<FadeInOutProp> = ({show, children}) => {
    return (
        <AnimatePresence>
            {(
                <motion.div
                    variants={upFadeVariants}
                    animate={show ? 'show' : 'hide'}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default FadeInOut;