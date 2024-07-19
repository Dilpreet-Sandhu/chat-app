import {keyframes, Skeleton, styled} from '@mui/material';


export const visuallyHiddenInput = styled('input')`
    border  :0,
    clip : "rect(0 0 0 0)",
    height : 1,
    margin : -1,
    overflow : 'hidden',
    padding:  0,
    whiteSpace : "nowrap",
    width: 1

`
const bounce = keyframes`
0% {transform : scale(1)}
50% {transform : scale(1.5)}
100% {transform : scale(1)}
`
export const BouncingSkeleton = styled(Skeleton)(() => ({
    animation : `${bounce} 1s infinite ease`
}))