"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import PropertyItem from "../PropertyItem";
import { formatDate, convertMBtoGB, getAgeByBirthday } from "@/utility/utility";
import Button from "../Button";
import { buttonStates } from "@/utility/states";
import UserEmoji from "../UserEmoji";
import Loading from "../Loading";

const UserDataDisplay = ({ searchString, onConnect }: any) => {
    const [pageReady, setPageReady] = useState<boolean>(false);
    const [loadStatus, setLoadStatus] = useState<string>("");
    const [userData, setUserData] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]);
    useEffect(() => {

        const getUserData = async () => {
            try {
                const query = await fetch(`${process.env.API_PATH}/api/User`);

                if (!query.ok) {

                    setPageReady(false);
                    setLoadStatus("サーバーに接続できませんでした。");
                    throw new Error(`Failed to fetch data. Status: ${query.status}`);
                }

                const response = await query.json();
                setUserData(response);
                setFilteredUserData(response);
                setPageReady(true);
                onConnect();
            } catch (error: any) {
                // Handle the error here
                console.error('Error fetching data:', error.message);
                setPageReady(false);
                setLoadStatus("サーバーに接続できませんでした。");
                // You might want to display an error message to the user or log the error for further investigation
            }
        }

        getUserData();
    }, []);

    //検索文字列の変更ごとに呼び出し
    useEffect(() => {
        const searchLower = searchString.toLowerCase();
        const filtered = userData.filter((user: any) => {
            const firstNameMatch = user.firstName.toLowerCase().includes(searchLower);
            const lastNameMatch = user.lastName.toLowerCase().includes(searchLower);
            const kanaFirstNameMatch = user.kanaFirstName.toLowerCase().includes(searchLower);
            const kanaLastNameMatch = user.kanaLastName.toLowerCase().includes(searchLower);
            const telNumberMatch = user.telNumber.toLowerCase().includes(searchLower);
            const emailMatch = user.email.toLowerCase().includes(searchLower);
            const deptMatch = user.department.name.toLowerCase().includes(searchLower);
            const posMatch = user.position.name.toLowerCase().includes(searchLower);
            const userIdMatch = user.userId.toLowerCase().includes(searchLower);
            const sexMatch = user.sex.name.toLowerCase().includes(searchLower);

            return firstNameMatch || lastNameMatch || kanaFirstNameMatch || kanaLastNameMatch || telNumberMatch || emailMatch || deptMatch || posMatch || userIdMatch || sexMatch;
        });

        setFilteredUserData(filtered);
    }, [searchString])

    if (!pageReady) return <Loading message={loadStatus} />
    return (
        <div className={style.userDataDisplay}>
            <UserList data={filteredUserData} />
        </div>
    );
}

export default UserDataDisplay;



const UserList = ({ data }: any) => {
    // console.log(data);
    return (
        <ul className={style.userList}>
            {data.map((user: any) => {
                return <UserItem user={user} key={user.id} />
            })}
        </ul>
    );
}


const UserItem = ({ user }: any) => {
    // console.log(user);
    return (
        <li className={`${style.userItem} ${user.deactivated ? style.disabled : ""}`}>
            <div className={style.info}>
                <div className={`${style.nameLabel} ${commonStyle.borderBottom}`}>

                    {/* Name */}

                    <h4 className={style.emoji}>
                        <UserEmoji type={user.sex.id} />
                    </h4>
                    <h3 className={style.name}>
                        <label>
                            <span className={style.kana}>{user.kanaLastName}</span>
                            <span className={style.kanji}>{user.lastName}</span>
                        </label>
                        <label>
                            <span className={style.kana}>{user.kanaFirstName}</span>
                            <span className={style.kanji}>{user.firstName}</span>
                        </label>
                    </h3>

                </div>
                <div className={style.half}>
                    {/* Left Section */}
                    <div className={style.left}>
                        <div className={`${commonStyle.paddingBottomOneRem} ${commonStyle.marginBottomOneRem} ${commonStyle.borderBottom}`}>{/* Detail Info */}
                            {/* <DetailPropertyInfo item={item} /> */}
                            <PropertyItem label="社員番号" data={user.userId} />
                            <PropertyItem label="部署" data={user.department.name} />
                            <PropertyItem label="役職" data={user.position.name} />
                            <PropertyItem label="管理者権限" data={user.isAdmin ? "有" : "無"} />
                        </div>
                        <div>
                            <PropertyItem label="年齢" data={user.birthday == null ? user.ageDeprecated : getAgeByBirthday(user.birthday)} />
                            <PropertyItem label="性別" data={user.sex.name} />
                        </div>


                    </div>

                    {/* Right Section */}
                    <div className={style.right}>
                        <div className={commonStyle.paddingBottomOneRem}>{/* 登録更新 */}
                            <PropertyItem label="📞" data={user.telNumber} copyable />
                            <PropertyItem label="📧" data={user.email} copyable />
                        </div>

                        <div>{/* 備考 */}
                            <PropertyItem label="備考" data={user.remarks} breakLine messageOnNull="記入なし" />
                        </div>

                    </div>
                </div >
            </div>
            <div className={style.buttonContainer}>
                <Button className={style.button} type={buttonStates.detail} text="詳細情報" link={`/users/${user.userId}`} />
                {/* <Button type={buttonStates.detail} text="詳細情報" link={{
                    pathname: `/users/${user.userId}`,
                    query: user // the data
                }} /> */}
            </div>
        </li >
    );
}

const DetailPropertyInfo = ({ item }: any) => {

    var properties: any = [];
    properties.push(<PropertyItem label="タイプ" data={item.deviceType?.name} skipOnNull />);
    properties.push(<PropertyItem label="メーカー" data={item.maker?.name} skipOnNull />);
    properties.push(<PropertyItem label="OS" data={item.os.name} skipOnNull />);
    properties.push(<PropertyItem label="メモリ" data={convertMBtoGB(item.memory) + "GB"} skipOnNull />);
    properties.push(<PropertyItem label="容量" data={convertMBtoGB(item.capacity) + "GB"} skipOnNull />);
    properties.push(<PropertyItem label="GPU" data={(item.hasGpu == 1) ? "有" : "無"} skipOnNull />);

    return (
        <>
            {properties.map((elem: any) => {
                return elem;
            })}
        </>
    );
}

// const DataRow = (data: any) => {
//     var data = data.data;
//     console.log(data);
//     return (
//         <table>
//             <tr>
//                 <td>Device ID</td>
//                 {/* <td>Rental End</td> */}
//             </tr >
//             {data.map((device: any) => {
//                 return (

//                     <tr>
//                         <td>{device.deviceId}</td>
//                         <td>{device.remarks}</td>
//                         <td>{device.capacity / 1000 + "GB"}</td>
//                         <td>{device.memory / 1000 + "GB"}</td>
//                         {/* <td>{new Date(Date.parse(lending.rentalEnd)).toString()}</td> */}
//                     </tr >

//                 );
//             })}
//         </table>
//     );
// }