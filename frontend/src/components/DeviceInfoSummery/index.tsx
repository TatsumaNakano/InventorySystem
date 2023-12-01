import { base64ToEmoji, fetchAndSet } from "@/utility/utility";
import style from "./style.module.scss"
import { useEffect, useState } from "react";


const DeviceInfoSummery = ({ data }: any) => {

    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

    useEffect(() => {
        fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceType`, setDeviceTypeOptions);
    }, [])

    // console.log(data)

    return (
        <div className={style.deviceInfoSummery}>
            <h5>機器情報サマリ</h5>
            {deviceTypeOptions.map((type: any) => {
                return <StatusBar text={type.name} data={data.filter((item: any) => item.deviceType.id == type.id)} key={type.name} />
            })}
        </div>
    );
}

const StatusBar = ({ text, data }: any) => {
    const itemAvailable = data.filter((item: any) => item.currentUser == null && item.brokenFlag == 0 && item.deleteFlag == 0).length;
    const currentlyLended = data.filter((item: any) => item.currentUser != null && item.brokenFlag == 0 && item.deleteFlag == 0).length;
    const broken = data.filter((item: any) => item.brokenFlag == 1 && item.deleteFlag == 0).length;
    const noItems = data.length == 0;
    if (noItems) return <></>
    return (
        <div className={style.statusBar}>
            <div>
                <label>{base64ToEmoji(data[0].deviceType.emoji)}{text}</label>
            </div>
            <div>
                <label>貸出可能:{itemAvailable}台</label>
                <label>貸出中:{currentlyLended}台</label>
                <label>故障中:{broken}台</label>
            </div>
        </div>
    );
}

export default DeviceInfoSummery;