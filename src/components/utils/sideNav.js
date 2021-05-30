import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import { navDirections } from './navDirections'

export const sideNav = [
    {
        target: navDirections.ADMIN_PANEL,
        icon: <HomeRoundedIcon />,
        text: 'Home'
    },
    {
        target: navDirections.NOT_VERIFIED,
        icon: <NoEncryptionIcon />,
        text: 'Not Verified'
    },
    {
        target: navDirections.VERIFIED,
        icon: <HttpsRoundedIcon />,
        text: 'Verified'
    }
]
