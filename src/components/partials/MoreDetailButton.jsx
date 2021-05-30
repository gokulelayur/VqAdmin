import { IconButton } from '@material-ui/core'
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded'

function MoreDetailButton({ onClick }) {
    return (
        <IconButton onClick={onClick}>
            <OpenInNewRoundedIcon />
        </IconButton>
    )
}

export default MoreDetailButton
