import React from "react";
import {AnimatePresence, motion, Variants} from "framer-motion";
import {upFadeVariants,downFadeVariants} from "./config";

interface FadeInOutProp {
    show: boolean,
    orientation?:'up'|'down',
    children: React.ReactNode
}

const FadeInOut: React.FC<FadeInOutProp> = ({show, children,orientation='up'}) => {
    return (
        <AnimatePresence>
            {(
                <motion.div
                    variants={orientation==='up'?upFadeVariants:downFadeVariants}
                    animate={show ? 'show' : 'hide'}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default FadeInOut;