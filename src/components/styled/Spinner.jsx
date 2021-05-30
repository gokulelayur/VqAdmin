import styled, { keyframes } from 'styled-components'

const spinningAnimation = keyframes`
    to {
        transform: rotate(.5turn)
    }
`

export const Spinner = styled.div`
    width: 50px;
    height: 50px;
    display: grid;

    &::before,
    &::after {
        content: '';
        grid-area: 1/1;
        --c: radial-gradient(farthest-side, #25b09b 92%, #0000);
        background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
            var(--c) 0 50%;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        animation: ${spinningAnimation} 1s infinite;
    }

    &::before {
        margin: 4px;
        filter: hue-rotate(45deg);
        background-size: 8px 8px;
        animation-timing-function: linear;
    }
`
