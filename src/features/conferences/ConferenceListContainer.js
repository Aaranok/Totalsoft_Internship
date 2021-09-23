import React, { useCallback, useState } from 'react'
import ConferenceFilters from 'features/conferences/ConferenceFilters'
import conferences from 'utils/mocks'
import ConferenceList from 'features/conferences/ConferenceList'
import makeDefaultFilter from 'utils/functions/defaultFilterInfo'

const ConferenceListContainer = () => {
    const {data} = {data: conferences}
    const [filters, setFilters] = useState(makeDefaultFilter())
    
    const handleFilter = useCallback( (value) => {setFilters(value)},[])



    return <>
        <ConferenceFilters filters={filters} onApplyFilters={handleFilter} />
        <ConferenceList conferences = {data}/>

    </>

}

export default ConferenceListContainer
