"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
const DeviceDataTable = () => {

    const [deviceData, setDeviceData] = useState([]);
    useEffect(() => {

        const getdeviceData = async () => {
            const query = await fetch("https://localhost:7070/api/Device");
            const response = await query.json();
            setDeviceData(response);
        }

        getdeviceData();
    }, []);

    return (

        <DataRow data={deviceData} />

    );
}

export default DeviceDataTable;

const DataRow = (data: any) => {
    var data = data.data;
    console.log(data);
    return (
        <table>
            <tr>
                <td>Device ID</td>
                {/* <td>Rental End</td> */}
            </tr >
            {data.map((device: any) => {
                return (

                    <tr>
                        <td>{device.deviceId}</td>
                        <td>{device.remarks}</td>
                        <td>{device.capacity / 1000 + "GB"}</td>
                        <td>{device.memory / 1000 + "GB"}</td>
                        {/* <td>{new Date(Date.parse(lending.rentalEnd)).toString()}</td> */}
                    </tr >

                );
            })}
        </table>
    );
}