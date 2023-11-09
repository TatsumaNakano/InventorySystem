"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import DeviceEmoji from "../DeviceEmoji";
import PropertyItem from "../PropertyItem";
import { formatDate, formatByteSize } from "@/utility/utility";
import Button from "../Button";
import { buttonStates } from "@/utility/states";

const DeviceDataDisplay = () => {

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
        <div className={style.deviceDataDisplay}>
            <DeviceList data={deviceData} />
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
    console.log(item);
    return (
        <li className={style.deviceItem}>
            <div className={style.info}>
                {/* Left Section */}
                <div className={style.left}>
                    <div className={`${style.nameLabel} ${commonStyle.borderBottom}`}>
                        {/* Icon Emoji */}
                        <h4 className={style.emoji}>
                            <DeviceEmoji type={item.deviceType.id} />
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
                        <PropertyItem label="備考" data={item.remarks} breakLine messageOnNull="記入なし" />
                    </div>

                </div>
            </div>
            <div className={style.buttonContainer}>
                {
                    item.currentUser == null ?
                        <Button type={buttonStates.positive} text="貸し出す" link="/" /> :
                        <Button type={buttonStates.disabled} text={`${item.currentUser.lastName}${item.currentUser.firstName}が貸出中`} link="/" />
                }

                <Button type={buttonStates.detail} text="詳細情報" link="/" />
            </div>
        </li>
    );
}

const DetailPropertyInfo = ({ item }: any) => {

    var properties: any = [];
    properties.push(<PropertyItem label="タイプ" data={item.deviceType?.name} skipOnNull />);
    properties.push(<PropertyItem label="メーカー" data={item.maker?.name} skipOnNull />);
    properties.push(<PropertyItem label="OS" data={item.os.name} skipOnNull />);
    properties.push(<PropertyItem label="メモリ" data={formatByteSize(item.memory)} skipOnNull />);
    properties.push(<PropertyItem label="容量" data={formatByteSize(item.capacity)} skipOnNull />);
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