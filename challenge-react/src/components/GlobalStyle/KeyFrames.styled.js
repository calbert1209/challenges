import { keyframes } from 'styled-components'

export const Shake = keyframes`
    0% {
        transform: skewX(-15deg);
    }
    5% {
        transform: skewX(15deg);
    }
    10% {
        transform: skewX(-15deg);
    }
    15% {
        transform: skewX(15deg);
    }
    20% {
        transform: skewX(0deg);
    }
    100% {
        transform: skewX(0deg);
    }
`
