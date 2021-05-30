import MoreDetailButton from '../partials/MoreDetailButton'

export const createRows = (data = [], viewDetails) => {
    if (!!!data.length) return

    let rows = []

    data?.forEach((row) => {
        rows.push([
            row?.companyName,
            row?.deptName,
            row?.mapLink,
            <MoreDetailButton onClick={() => viewDetails(row)} />
        ])
    })

    return rows
}

export const tableHeaders = [`Company Name`, `Dept. Name`, `Map Link`, `More`]
