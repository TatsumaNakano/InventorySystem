"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
const UserDataTable = () => {

    const [userData, setUserData] = useState([]);
    useEffect(() => {

        const getuserData = async () => {
            const query = await fetch("https://localhost:7070/api/User");
            const response = await query.json();
            setUserData(response);
        }

        getuserData();
    }, []);

    return (

        <DataRow data={userData} />

    );
}

export default UserDataTable;

const DataRow = (data: any) => {
    var data = data.data;
    console.log(data);
    return (
        <table>
            <tr>
                <td>User ID</td>
                <td>名字</td>
                <td>名前</td>
                <td>メールアドレス</td>
                <td>電話番号</td>

            </tr >
            {data.map((user: any) => {
                return (

                    <tr>
                        <td>{user.userId}</td>
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        {/* <td>{user.isAdmin}</td> */}
                        <td>{user.email}</td>
                        <td>{user.telNumber}</td>
                    </tr >

                );
            })}
        </table>
    );
}