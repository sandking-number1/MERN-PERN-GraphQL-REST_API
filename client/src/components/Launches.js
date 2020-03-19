/* write rce*/ 
import React, { Component } from 'react';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

function Launches() {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);

    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    console.log(data);

    return (
        <div>
            <h1 className="display-4 my-3">Launches</h1>
            <h1>test</h1>
        </div>
    )
    
}

export default Launches
