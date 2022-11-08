import {Variants} from "framer-motion";

const fadeVariants: Variants = {
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
            }
        }
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
        }
    },
} as const

export {fadeVariants}
