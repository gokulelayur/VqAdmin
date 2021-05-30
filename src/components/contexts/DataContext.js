import { useState, useEffect, createContext, useContext } from 'react'
import { DB } from '../../firebase'
import { useAuthContext } from './AuthContext'

const dataContext = createContext()

export const useDataContext = () => useContext(dataContext)

export function DataContextProvider({ children }) {
    const [companyData, setCompanyData] = useState([])
    const [unVerifiedData, setUnVerifiedData] = useState([])
    const [currentUserCode, setCurrentUserCode] = useState('')
    const [activeData, setActiveData] = useState('')

    const { user } = useAuthContext()

    /* GETTING UNIQUE USER CODE */

    function getCurrentUserCode() {
        if (!!!user) return
        console.log('Getting User Code...')

        try {
            var userCodeRef = DB.ref(
                `main/UserCredentials/${user?.email.split('@')[0]}/pword`
            )
            userCodeRef.on('value', (snapshot) => {
                const code = snapshot.val()
                setCurrentUserCode(code)
            })
        } catch (error) {}
    }

    function getCompanyData() {
        if (!!!user) return
        console.log('Getting Company data...')

        var companyRef = DB.ref(`main/company`)
        companyRef.on('value', (snapshot) => {
            const data = snapshot.val()
            setCompanyData(data)
        })
    }
    function getUnverifiedData() {
        if (!!!user) return
        console.log('Getting Unverified data...')

        var unverifiedRef = DB.ref(`main/unverified`)
        unverifiedRef.on('value', (snapshot) => {
            const data = snapshot.val()

            setUnVerifiedData(data)
        })
    }

    useEffect(() => {
        !!user && !!!currentUserCode && getCurrentUserCode()
        !!user && !!!unVerifiedData?.length && getUnverifiedData()
        !!user && !!!companyData?.length && getCompanyData()
    }, [user])

    const values = {
        companyData,
        unVerifiedData,
        currentUserCode,
        activeData,
        setActiveData
    }

    return (
        <dataContext.Provider value={values}>{children}</dataContext.Provider>
    )
}
