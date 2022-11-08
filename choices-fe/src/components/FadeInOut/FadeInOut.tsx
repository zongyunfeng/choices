import React from "react";
import {AnimatePresence, motion, Variants} from "framer-motion";
import {fadeVariants} from "./config";

interface FadeInOutProp {
    show: boolean,
    children: React.ReactNode
}

const FadeInOut: React.FC<FadeInOutProp> = ({show, children}) => {
    return (
        <AnimatePresence>
            {(
                <motion.div
                    variants={fadeVariants}
                    animate={show ? 'show' : 'hide'}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default FadeInOut;