import { Container } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useDataContext } from './contexts/DataContext'
import Heading from './partials/Heading'
import { navDirections } from './utils/navDirections'
import GeneralTemplate from './templates/GeneralTemplate'
import React from 'react'
import DataDisplayCard from './partials/DataDisplayCard'

function DisplayDetails({ verified }) {
    const { activeData } = useDataContext()

    return (
        (!!activeData && (
            <GeneralTemplate>
                <Heading title={'Details'} />

                <Container maxWidth="md">
                    <DataDisplayCard
                        verified={verified}
                        activeData={activeData}
                    />
                </Container>
            </GeneralTemplate>
        )) || <Redirect to={navDirections.ADMIN_PANEL} />
    )
}

export default DisplayDetails
