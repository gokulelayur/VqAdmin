import { useState, useEffect, createContext, useContext } from 'react'
import app from '../../firebase'
import styled from 'styled-components'
import CustomDialog from '../partials/CustomDialog'
import { Spinner } from '../styled/Spinner'

const authContext = createContext()

export const useAuthContext = () => useContext(authContext)

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)

    const logout = () => setOpenDialog(true)

    const handleCloseDialog = () => setOpenDialog(false)

    /* AUTH STATE CHANGE LISTENER */

    const authStateChange = () => {
        setError('')
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser('')
                setLoading(false)
            }
        })
    }

    /* LOGIN */

    const login = (email, password) => {
        setError('')
        app.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Signed IN')
            })
            .catch((error) => {
                console.log('Error Occured', error)
                setError('! Error Occured')
            })
    }

    /* LOGOUT */

    const handleLogout = () => {
        handleCloseDialog()

        app.auth()
            .signOut()
            .then(() => {
                console.log('Looged Out')
            })
            .catch((error) => {
                console.log('Error occured while logging out', error)
            })
    }

    useEffect(() => {
        authStateChange()
    }, [])

    const values = {
        user,
        login,
        logout,
        error
    }

    if (loading)
        return (
            <LoadingContainer>
                <Spinner />
            </LoadingContainer>
        )

    return (
        <authContext.Provider value={values}>
            {children}
            <CustomDialog
                title={'Are you Sure ?'}
                description={'You will be logged out from this sessions...'}
                successText={'Logout'}
                cancelText={'Cancel'}
                successFunc={handleLogout}
                open={openDialog}
                handleClose={handleCloseDialog}
            />
        </authContext.Provider>
    )
}

const LoadingContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
