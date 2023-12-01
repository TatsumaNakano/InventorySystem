"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import PropertyItem from "../PropertyItem";
import { formatDate, formatByteSize, emojiToBase64, base64ToEmoji } from "@/utility/utility";
import Button from "../Button";
import { buttonStates } from "@/utility/states";
import DeviceInfoSummery from "@/components/DeviceInfoSummery"
import Loading from "../Loading";


const DeviceDataDisplay = ({ searchString, onConnected }: any) => {


    const [pageReady, setPageReady] = useState<boolean>(false);
    const [loadStatus, setLoadStatus] = useState<string>("");

    const [deviceData, setDeviceData] = useState([]);
    const [filteredDeviceData, setFilteredDeviceData] = useState([]);


    useEffect(() => {

        const getDeviceData = async () => {
            try {
                const query = await fetch(`${process.env.API_PATH}/api/Device`);

                if (!query.ok) {

                    setPageReady(false);
                    setLoadStatus("サーバーに接続できませんでした。");
                    throw new Error(`Failed to fetch data. Status: ${query.status}`);
                }
                const response = await query.json();
                setDeviceData(response);
                setFilteredDeviceData(response);
                setPageReady(true);
                onConnected();
            } catch (error: any) {
                // Handle the error here
                console.error('Error fetching data:', error.message);
                setPageReady(false);
                setLoadStatus("サーバーに接続できませんでした。");
                // You might want to display an error message to the user or log the error for further investigation
            }
        }

        getDeviceData();
    }, []);


    //検索文字列の変更ごとに呼び出し
    useEffect(() => {
        const searchLower = searchString.toLowerCase();
        const filtered = deviceData.filter((obj: any) => {
            const deviceIdMatch = obj.deviceId.toLowerCase().includes(searchLower);
            const makerNameMatch = obj.maker.name.toLowerCase().includes(searchLower);
            const placeNameMatch = obj.place.name.toLowerCase().includes(searchLower);
            const deviceTypeNameMatch = obj.deviceType.name.toLowerCase().includes(searchLower);

            return deviceIdMatch || makerNameMatch || placeNameMatch || deviceTypeNameMatch;
        });

        setFilteredDeviceData(filtered);
    }, [searchString])

    if (!pageReady) return <Loading message={loadStatus} />
    return (
        <div className={style.deviceDataDisplay}>
            <DeviceInfoSummery data={deviceData} />
            <DeviceList data={filteredDeviceData} />
        </div>
    );
}

export default DeviceDataDisplay;


const DeviceList = ({ data }: any) => {
    // console.log(data);
    return (
        <ul className={style.deviceList}>
            {data.map((device: any) => {
                return <DeviceItem item={device} key={device.id} />
            })}
        </ul>
    );
}


const DeviceItem = ({ item }: any) => {
    // console.log((item.registrationDate));
    // console.log(formatDate(item.registrationDate));
    var rentalButton = (() => {
        if (item.currentUser == null) {
            if (item.brokenFlag == 0 && item.deleteFlag == 0) {
                return <Button className={style.button} type={buttonStates.positive} text="貸し出す" link={{
                    pathname: "/lendings/edit",
                    query: { deviceId: item.id }
                }} />
            } else {
                if (item.deleteFlag == 1) {
                    return <Button className={style.button} type={buttonStates.disabled} text={`削除済み`} link="/" />;
                }
                else if (item.brokenFlag == 1 && item.deleteFlag == 0) {
                    return <Button className={style.button} type={buttonStates.disabled} text={`故障中`} link="/" />;
                }

            }
        } else {
            return <Button className={style.button} type={buttonStates.disabled} text={`${item.currentUser.lastName}${item.currentUser.firstName}が貸出中`} link="/" />
        }
    })()

    return (
        <li className={`${style.deviceItem} ${Boolean(item.brokenFlag) || Boolean(item.deleteFlag) ? style.disabled : style.enabled}`}>
            <div className={style.info}>
                {/* Left Section */}
                <div className={style.left}>
                    <div className={`${style.nameLabel} ${commonStyle.borderBottom}`}>
                        {/* Icon Emoji */}
                        <h4 className={style.emoji}>
                            {base64ToEmoji(item.deviceType.emoji)}
                            {item.deleteFlag == 1 ? <label className={style.deleteFlag}>❌</label> : null}
                            {item.deleteFlag == 0 && item.brokenFlag == 1 ? <label className={style.brokenFlag}>🛠️</label> : null}
                        </h4>

                        {/* Name and Info */}
                        <div>
                            <h3>{item.deviceId}</h3>
                            {item.oldName != null ? <label>{`旧名 ${item.oldName}`}</label> : null}
                        </div>
                    </div>
                    <div>{/* Detail Info */}
                        <DetailPropertyInfo item={item} />
                    </div>
                    <div>{/* Storage Place */}
                        <PropertyItem label="保管場所" data={item.place.name} />
                    </div>


                </div>

                {/* Right Section */}
                <div className={style.right}>
                    <div>{/* 登録更新 */}
                        <PropertyItem label="登録日" data={formatDate(item.registrationDate)} />
                        <PropertyItem label="更新日" data={formatDate(item.updateDate)} />
                    </div>
                    <div>{/* リース */}
                        <PropertyItem label="リース開始" data={formatDate(item.leaseStartDate)} />
                        <PropertyItem label="リース期日" data={formatDate(item.leaseEndDate)} />
                    </div>
                    <div>{/* 備考 */}
                        <PropertyItem label="備考" data={item.remarks != null ? item.remarks.slice(0, 100) + "..." : ""} breakLine messageOnNull="記入なし" />
                    </div>

                </div>
            </div>
            <div className={style.buttonContainer}>
                {rentalButton}
                <Button className={style.button} type={buttonStates.detail} text="詳細情報" link={`/devices/${item.deviceId}`} />
            </div>
        </li>
    );
}

const DetailPropertyInfo = ({ item }: any) => {

    var properties: any = [];
    properties.push(<PropertyItem label="タイプ" data={item.deviceType?.name} skipOnNull key={item.deviceId + "_type"} />);
    properties.push(<PropertyItem label="メーカー" data={item.maker?.name} skipOnNull key={item.deviceId + "_maker"} />);
    item.os != null ? properties.push(<PropertyItem label="OS" data={item.os.name} skipOnNull key={item.deviceId + "_os"} />) : null;
    item.memory != null ? properties.push(<PropertyItem label="メモリ" data={formatByteSize(item.memory)} skipOnNull key={item.deviceId + "_memory"} />) : null;
    item.capacity != null ? properties.push(<PropertyItem label="容量" data={formatByteSize(item.capacity)} skipOnNull key={item.deviceId + "_capacity"} />) : null;
    item.hasGpu != null ? properties.push(<PropertyItem label="GPU" data={(item.hasGpu == 1) ? "有" : "無"} skipOnNull key={item.deviceId + "_gpu"} />) : null;


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