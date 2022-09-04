import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../../GlobalState'
import PakageItem2 from '../utils/pakageItem/PakageItem2'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'

function Pakages2() {
    const state = useContext(GlobalState)
    const [pakages, setPakages] = state.pakagesAPI.pakages
  
    const [isAdmin] = state.sellpackAPI.isAdmin
    const [callback, setCallback] = state.pakagesAPI.callback
    const [loading, setLoading] = useState(false)
    

    const handleCheck = (id) =>{
        pakages.forEach(pakage => {
            if(pakage._id === id) pakage.checked = !pakage.checked
        })
        setPakages([...pakages])
    }

    const deletePakage = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
          
            })
            const deletePakage = axios.delete(`/api/pakages/${id}`, {
           
            })

            await destroyImg
            await deletePakage
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

   

 

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
       

        <div className="pakages">
            {
                pakages.map(pakage => {
                    return <PakageItem2 key={pakage._id} pakage={pakage}
                   deletePakage={deletePakage} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {pakages.length === 0 && <Loading />}
        </>
    )
}

export default Pakages2

