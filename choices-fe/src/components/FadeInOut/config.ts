import {Variants} from "framer-motion";

const upFadeVariants: Variants = {
    hide: {
        opacity: 0,
        height: 0,
        y: -16,
        transition: {
            opacity: {
                ease: 'easeIn', duration: 0.3
            },
            height: {
                ease: 'easeIn', delay: 0.2, duration: 0.5
            },
        },
        transitionEnd: {
            display: "none",
        },
    },
    show: {
        opacity: 1,
        height: 'auto',
        y: 0,
        transition: {
            opacity: {
                ease: 'easeOut', delay: 0.2, duration: 0.5
            },
            height: {
                ease: 'easeOut', duration: 0.3
            }
        },
        transitionEnd:{
            display: 'block'
        }
    },
} as const
const downFadeVariants: Variants = {
    hide: {
        opacity: 0,
        height: 0,
        y: -16,
        transition: {
            opacity: {
                ease: 'easeIn', duration: 0.3
            },
            height: {
                ease: 'easeIn', delay: 0.2, duration: 0.5
            },
        },
        transitionEnd: {
            display: "none",
        },
    },
    show: {
        opacity: 1,
        height: 'auto',
        y: 0,
        transition: {
            opacity: {
                ease: 'easeOut', delay: 0.2, duration: 0.5
            },
            height: {
                ease: 'easeOut', duration: 0.3
            }
        },
        transitionEnd:{
            display: 'block'
        }
    },
} as const

export {upFadeVariants,downFadeVariants}
