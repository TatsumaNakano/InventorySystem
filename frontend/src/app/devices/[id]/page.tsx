"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import PropertyItem from "@/components/PropertyItem";
import { formatDate, formatByteSize, base64ToEmoji } from "@/utility/utility";
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import { usePathname, useRouter } from 'next/navigation'
import Link from "next/link";
import PageBackButton from "@/components/PageBackButton";

const DeviceItem = () => {

    const [deviceData, setDeviceData] = useState();
    const path = usePathname();

    useEffect(() => {
        const getDeviceData = async () => {
            const deviceId = path.substring(path.lastIndexOf('/') + 1)
            const query = await fetch(`${process.env.API_PATH}/api/Device/deviceId/${deviceId}`);
            const response = await query.json();
            setDeviceData(response);
        }

        getDeviceData();
    }, [path])

    const device = deviceData as any;
    if (!device) return;
    // console.log(device);

    var rentalButton = (() => {
        if (device.currentUser == null) {
            if (device.brokenFlag == 0 && device.deleteFlag == 0) {
                return <Button className={style.button} type={buttonStates.positive} text="貸し出す" link={{
                    pathname: "/lendings/edit",
                    query: { deviceId: device.id }
                }} />
            } else {
                if (device.deleteFlag == 1) {
                    return <Button className={style.button} type={buttonStates.disabled} text={`削除済み`} link="/" />;
                }
                else if (device.brokenFlag == 1 && device.deleteFlag == 0) {
                    return <Button className={style.button} type={buttonStates.disabled} text={`故障中`} link="/" />;
                }

            }
        } else {
            return <Button className={style.button} type={buttonStates.disabled} text={`${device.currentUser.lastName}${device.currentUser.firstName}が貸出中`} link="/" />
        }
    })()

    return (
        <>
            <PageBackButton text={"機器一覧に戻る"} href="/devices" />
            <div className={`${style.deviceItem} ${device.deleteFlag == 1 || device.brokenFlag == 1 ? style.disabled : style.enabled} `}>

                <div className={style.info}>
                    {/* Left Section */}
                    <div className={style.left}>
                        <div className={`${style.nameLabel} ${commonStyle.borderBottom}`}>
                            {/* Icon Emoji */}
                            <h4 className={style.emoji}>
                                {base64ToEmoji(device.deviceType.emoji)}
                                {device.deleteFlag == 1 ? <label className={style.deleteFlag}>❌</label> : null}
                                {device.deleteFlag == 0 && device.brokenFlag == 1 ? <label className={style.brokenFlag}>🛠️</label> : null}

                            </h4>

                            {/* Name and Info */}
                            <div>
                                <h3>{device.deviceId}</h3>
                                {device.oldName != null ? <label>{`旧名 ${device.oldName}`}</label> : null}
                            </div>
                        </div>
                        <div>{/* Detail Info */}
                            <DetailPropertyInfo item={device} />
                        </div>
                        <div>{/* Storage Place */}
                            <PropertyItem label="保管場所" data={device.place.name} />
                        </div>
                    </div>


                    {/* Right Section */}
                    <div className={style.right}>
                        <div>{/* 登録更新 */}
                            <PropertyItem label="登録日" data={formatDate(device.registrationDate)} />
                            <PropertyItem label="更新日" data={formatDate(device.updateDate)} />
                        </div>
                        <div>{/* リース */}
                            <PropertyItem label="リース開始" data={formatDate(device.leaseStartDate)} />
                            <PropertyItem label="リース期日" data={formatDate(device.leaseEndDate)} />
                        </div>
                        <div>{/* 備考 */}
                            <PropertyItem label="備考" data={device.remarks} breakLine messageOnNull="記入なし" />
                        </div>

                    </div>
                </div>
                <div className={style.buttonContainer}>

                    {rentalButton}

                    <Button className={style.button} type={buttonStates.detail} text="詳細情報" link={{ pathname: "/devices/edit", query: device }} />
                </div>
            </div>

        </>
    );
}

const DetailPropertyInfo = ({ item }: any) => {

    var properties: any = [];
    properties.push(<PropertyItem label="タイプ" data={item.deviceType?.name} skipOnNull key={item.deviceId + "_type"} />);
    properties.push(<PropertyItem label="メーカー" data={item.maker?.name} skipOnNull key={item.deviceId + "_maker"} />);
    properties.push(<PropertyItem label="OS" data={item.os.name} skipOnNull key={item.deviceId + "_os"} />);
    properties.push(<PropertyItem label="メモリ" data={formatByteSize(item.memory)} skipOnNull key={item.deviceId + "_memory"} />);
    properties.push(<PropertyItem label="容量" data={formatByteSize(item.capacity)} skipOnNull key={item.deviceId + "_capacity"} />);
    properties.push(<PropertyItem label="GPU" data={(item.hasGpu == 1) ? "有" : "無"} skipOnNull key={item.deviceId + "_gpu"} />);


    return (
        <>
            {properties.map((elem: any) => {
                return elem;
            })}
        </>
    );
}

export default DeviceItem;