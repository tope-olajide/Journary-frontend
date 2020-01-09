import React, {useState, useContext} from 'react'
import useSWR from "swr";
import axios from 'axios'
import EntriesView from './EntriesView'
import LoadMoreButton from '../commons/LoadMoreButton'
import {Store} from '../../Store'
const token = localStorage.getItem('token');
const setHeaderToken = {
    headers: {
        authorization: token
    }
}
const AllPublicEntries = () => {
    const url = 'http://127.0.0.1:9000/api/entry';
    const { state, dispatch } = useContext(Store);
    const [pageNumber, setPageNumber] = useState(1)
    const fetcher = async (...args) => {
        const response = await axios.get(`${args}?page=${pageNumber}`, setHeaderToken);
        const { entries, currentPage } = response.data;
        console.log({ entries, currentPage })
         dispatch({
            type: 'FETCH_ALL_PUBLIC_ENTRIES',
            entries,
            currentPage
        }); 
        return response.data
    };
    const  { data, error }  = useSWR(url, fetcher);
    console.log (state)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <>
        <main class="entries-container">
{state.entries.map(entry=>{
return <EntriesView title={entry.title} entry_image_url={entry.entry_image_url}/>
})

}
</main>
<LoadMoreButton />
        </>
    )
}
export default AllPublicEntries