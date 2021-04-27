
import { Row } from 'antd/lib/grid';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { createArrayOfObjectForCards, getRecords } from '../../utils/utils';
import { CardComponent } from '../card/card.component';
import axios from '../../axios'

export const Records = (props) => {
    const [data, setData] = useState([])
    // <RecordData.Provider value={{data,value,setData}}>{
    useEffect(() => {
        console.log(props.id)
        getRecords(props.recId, props.patId).then(response => { setData(createArrayOfObjectForCards( response.data)); })
    }, [])
    console.log(data)
  //  const { isLoading, error, data, refetch } = useQuery('fetchRecords', () => axios.get('http://localhost:4321/record/af382e09-3ed1-4f07-9c66-e0454ca7fe14').then(response => createArrayOfObjectForCards(response.data)))
    return (
        <div className="records">
           <Row >
                {

                    Object.entries(data).map(([key, value]) => {

                        return  <CardComponent key={key} type={key} value={value} children={value} id={props.recId} />
                    }
                    )}
            </Row>
        </div>

    );
}