"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
const LendingDataTable = () => {

    const [lendingData, setLendingData] = useState([]);
    useEffect(() => {

        const getLendingData = async () => {
            const query = await fetch("https://localhost:7070/api/Lending");
            const response = await query.json();
            setLendingData(response);
        }

        getLendingData();
    }, []);

    return (

        <DataRow data={lendingData} />

    );
}

export default LendingDataTable;

const DataRow = (data: any) => {
    var data = data.data;
    console.log(data);
    return (
        <table>
            <tr>
                <td>Lending ID</td>
                <td>Rental End</td>
            </tr >
            {data.map((lending: any) => {
                return (

                    <tr>
                        <td>{lending.id}</td>
                        <td>{new Date(Date.parse(lending.rentalEnd)).toString()}</td>
                    </tr >

                );
            })}
        </table>
    );
}