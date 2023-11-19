'use client'
import DatePicker from "@/components/Inputs/DatePicker";
import TextInput from "@/components/Inputs/TextInput";
import style from "./style.module.scss"
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import Selectable from "@/components/Inputs/Selectable";
import { useEffect, useState } from "react";
import { fetchAndSet } from "@/utility/utility";
import TextArea from "@/components/Inputs/TextArea";

const DeviceEdit = ({ searchParams }: any) => {

    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const [storagePlaceOptions, setStoragePlaceOptions] = useState([]);
    const [deviceMakerOptions, setDeviceMakerOptions] = useState([]);
    const [osOptions, setOsOptions] = useState([]);


    const [deviceTypeId, setDeviceTypeId] = useState(1);
    const [leaseStartDate, setLeaseStartDate] = useState();
    const [leaseEndDate, setLeaseEndDate] = useState();
    const [inventoryDate, setInventoryDate] = useState();
    const [remarks, setRemarks] = useState(null);
    const [placeId, setPlaceId] = useState(1);
    const [makerId, setMakerId] = useState(1);
    const [osId, setOsId] = useState(1);
    const [memory, setMemory] = useState();
    const [capacity, setCapacity] = useState();
    const [hasGpu, setHasGpu] = useState(false);

    useEffect(() => {
        setDeviceTypeId(searchParams.deviceType.id);
        setLeaseStartDate(searchParams.leaseStartDate);
        setLeaseEndDate(searchParams.leaseEndDate);
        setInventoryDate(searchParams.inventoryDate);
        setRemarks(searchParams.remarks);
        setPlaceId(searchParams.place);
        setMakerId(searchParams.maker.id);
        setOsId(searchParams.os.id);
        setMemory(searchParams.memory);
        setCapacity(searchParams.capacity);
        setHasGpu(searchParams.hasGpu);

        fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceType`, setDeviceTypeOptions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/storagePlace`, setStoragePlaceOptions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceMaker`, setDeviceMakerOptions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/os`, setOsOptions);

    }, [])

    const sendRequest = () => {

        fetch(`${process.env.API_PATH}/api/Device`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                "deviceId": "",
                "deviceTypeId": deviceTypeId,
                "brokenFlag": 0,
                "leaseStartDate": leaseStartDate,
                "leaseEndDate": leaseEndDate,
                "inventoryDate": inventoryDate,
                "remarks": remarks,
                "deleteFlag": 0,
                "registrationDate": new Date().toISOString(),
                "updateDate": new Date().toISOString(),
                "placeId": placeId,
                "makerId": makerId,
                "osId": osId,
                "memory": memory,
                "capacity": capacity,
                "hasGpu": Number(hasGpu)
            })
        }).then((msg) => {
            console.log(msg);
        }).catch((err) => {
            console.error(err);
        })

    }

    const dtOption = deviceTypeOptions.map((dt: any) => {
        return ({
            label: dt.name,
            value: dt.id,
        });
    })

    const spOption = storagePlaceOptions.map((sp: any) => {
        return ({
            label: sp.name,
            value: sp.id,
        });
    })

    const dmOption = deviceMakerOptions.map((dm: any) => {
        return ({
            label: dm.name,
            value: dm.id,
        });
    })

    const osOption = osOptions.map((os: any) => {
        return ({
            label: os.name,
            value: os.id,
        });
    })




    return (
        <form className={style.form}>

            <div>
                <Selectable className={style.input} label="機器タイプ" onChange={setDeviceTypeId} options={dtOption} initialValue={deviceTypeId} />
                <Selectable className={style.input} label="メーカー" onChange={setMakerId} options={dmOption} initialValue={makerId} />
            </div>
            <div>
                <TextInput className={style.input} label="メモリ" onChange={setMemory} initialValue={memory} />
                <TextInput className={style.input} label="容量" onChange={setCapacity} initialValue={capacity} />
            </div>
            <div>
                <Selectable className={style.input} label="OS" onChange={setOsId} options={osOption} initialValue={osId} />
                <Selectable className={style.input} label="GPUの有無" onChange={setHasGpu} options={[{ label: "無", value: false }, { label: "有", value: true }]} initialValue={hasGpu} />
            </div>
            <div>
                <DatePicker className={style.input} label="棚卸日" placeholder="棚卸日" onChange={setInventoryDate} initialValue={leaseEndDate} />
                <Selectable className={style.input} label="保管場所" onChange={setPlaceId} options={spOption} />
            </div>
            <div>
                <DatePicker className={style.input} label="リース開始日" placeholder="リース開始日" onChange={setLeaseStartDate} initialValue={leaseStartDate} />
                <DatePicker className={style.input} label="リース期日" placeholder="リース期日" onChange={setLeaseEndDate} initialValue={leaseEndDate} />
            </div>
            <div>

            </div>
            <div>
                <TextArea className={style.textarea} label="備考" placeholder="備考" onChange={setRemarks} initialValue={remarks} />
            </div>

            <Button className={style.button} type={buttonStates.positive} text="新規登録" onClick={sendRequest} />
        </form>
    );
}

export default DeviceEdit;