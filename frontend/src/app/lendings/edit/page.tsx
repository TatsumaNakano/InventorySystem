"use client"
import DatePicker from "@/components/Inputs/DatePicker";
import TextInput from "@/components/Inputs/TextInput";
import style from "./style.module.scss"
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import Selectable from "@/components/Inputs/Selectable";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createOption, fetchAndSet, generateUUID } from "@/utility/utility"
import TextArea from "@/components/Inputs/TextArea";
import { useRecoilState } from "recoil";
import { popupState } from "@/utility/recoilStates";
import { messageStates } from "@/components/MessagePopup";
import PageBackButton from "@/components/PageBackButton";



const LendingEdit = ({ searchParams }: any) => {

    const { push } = useRouter();//JSでページ移動する時に必要
    const [popup, setPopup] = useRecoilState(popupState); //確認画面ポップアップのState


    const [availableDevices, setAvailableDevices] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);

    const [id, setId] = useState("");
    const [rentalStart, setRentalStart] = useState("");
    const [rentalEnd, setRentalEnd] = useState("");
    const [returnedDate, setReturnedDate] = useState(null);
    const [deviceId, setDeviceId] = useState(-1);
    const [userId, setUserId] = useState(-1);
    const [remarks, setRemarks] = useState(null);

    const [rentalStartWarning, setRentalStartWarning] = useState<string | boolean>(false);
    const [rentalEndWarning, setRentalEndWarning] = useState<string | boolean>(false);
    const [deviceIdWarning, setDeviceIdWarning] = useState<string | boolean>(false);
    const [userIdWarning, setUserIdWarning] = useState<string | boolean>(false);


    const pathname = usePathname();

    const editable = (Object.keys(searchParams).length == 1 && searchParams.deviceId != null) || Object.keys(searchParams).length == 0;


    useEffect(() => {
        const id = pathname.substring(pathname.lastIndexOf("&") + 1);
        // console.log(searchParams.deviceId);
        if (!editable) {
            searchParams.id ? setId(searchParams.id) : null
            searchParams.rentalStart ? setRentalStart(searchParams.rentalStart) : setRentalStart(new Date().toISOString());
            searchParams.rentalEnd ? setRentalEnd(searchParams.rentalEnd) : null;
            searchParams.returnedDate ? setReturnedDate(searchParams.returnedDate) : null;
            searchParams.deviceId ? setDeviceId(Number(searchParams.deviceId)) : null
            searchParams.userId ? setUserId(Number(searchParams.userId)) : null;
            searchParams.remarks ? setRemarks(searchParams.remarks) : null;
        } else {
            setDeviceId(Number(searchParams.deviceId))
            setRentalStart(new Date().toISOString())
        }

        if (!editable) {
            fetchAndSet(`${process.env.API_PATH}/api/Device`, setAvailableDevices);
        } else {
            fetchAndSet(`${process.env.API_PATH}/api/Device/available`, setAvailableDevices);
        }
        fetchAndSet(`${process.env.API_PATH}/api/User/available`, setAvailableUsers);

    }, [pathname])

    const validateInputs = (onValidationSuccess: Function) => {

        var somethingMissing = false;//入力に不備があった場合のフラグ

        if (!rentalStart) {
            setRentalStartWarning("必須項目です。");
            somethingMissing = true;
        } else {
            setRentalStartWarning(false);
        }

        if (!rentalEnd) {
            setRentalEndWarning("必須項目です。");
            somethingMissing = true;
        } else {
            setRentalEndWarning(false);
        }

        console.log("userId", userId)
        if (!userId || userId == -1) {
            setUserIdWarning("必須項目です。");
            somethingMissing = true;
        } else {
            setUserIdWarning(false);
        }

        if (!deviceId || deviceId == -1) {
            setDeviceIdWarning("必須項目です。");
            somethingMissing = true;
        } else {
            setDeviceIdWarning(false);
        }

        if (!somethingMissing) {
            onValidationSuccess();
        }
    }



    const addNewLending = () => {

        const uuid = generateUUID();

        fetch(`${process.env.API_PATH}/api/Lending`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                "rentalStart": rentalStart,
                "rentalEnd": rentalEnd,
                "deleteFlag": 0,
                "deviceId": deviceId,
                "userId": userId,
                "remarks": remarks,
                "tempId": uuid
            })
        }).then((msg) => {

            console.log(msg);
            fetch(`${process.env.API_PATH}/api/Lending/tempIdToLendingId/${uuid}`)
                .then(res => res.json())
                .then(data => {
                    push(`/lendings/${data}`);
                }).catch((err) => {
                    console.error(err);
                    setPopup({
                        message: "エラーが発生しました。\n\n" + err,
                        confirmMsg: "OK",
                        cancelMsg: "キャンセル",
                        state: messageStates.needConfirm,
                        onConfirm: () => { setPopup(null); },
                        onCancel: () => { setPopup(null); }
                    });
                });

        }).catch((err) => {
            console.error(err);
            setPopup({
                message: "エラーが発生しました。\n\n" + err,
                confirmMsg: "OK",
                cancelMsg: "キャンセル",
                state: messageStates.needConfirm,
                onConfirm: () => { setPopup(null); },
                onCancel: () => { setPopup(null); }
            });
        })

    }



    const editLending = () => {
        console.log(remarks)

        const body = {
            "id": id,
            "rentalStart": rentalStart,
            "rentalEnd": rentalEnd,
            "returnedDate": returnedDate,
            "deleteFlag": 0,
            "deviceId": deviceId,
            "userId": userId,
            "remarks": remarks,
            "tempId": ""
        }

        console.log(body)

        fetch(`${process.env.API_PATH}/api/Lending/edit`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body)
        }).then((msg) => {

            push(`/lendings/${id}`);
            // console.log(msg);
            // fetch(`${process.env.API_PATH}/api/Lending/tempIdToLendingId/${uuid}`)
            //     .then(res => res.json())
            //     .then(data => {
            //         push(`/lendings/${data}`);
            //     }).catch((err) => {
            //         console.error(err);
            //         setPopup({
            //             message: "エラーが発生しました。\n\n" + err,
            //             confirmMsg: "OK",
            //             cancelMsg: "キャンセル",
            //             state: messageStates.needConfirm,
            //             onConfirm: () => { setPopup(null); },
            //             onCancel: () => { setPopup(null); }
            //         });
            //     });

        }).catch((err) => {
            console.error(err);
            setPopup({
                message: "エラーが発生しました。\n\n" + err,
                confirmMsg: "OK",
                cancelMsg: "キャンセル",
                state: messageStates.needConfirm,
                onConfirm: () => { setPopup(null); },
                onCancel: () => { setPopup(null); }
            });
        })

    }

    const warnBeforeReturn = () => {
        setPopup({
            message: `機器の返却をします。よろしいですか？`,
            confirmMsg: "返却する",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => { returnLendingDevice() },
            onCancel: () => setPopup(null)
        })
    }


    const returnLendingDevice = () => {
        fetch(`${process.env.API_PATH}/api/Lending/delete/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((msg) => {
            console.log(msg);
            // console.log(deleteItem)
            push(`/`);
            setPopup(null);
        }).catch((err) => {
            console.log(err);
            setPopup({
                message: "エラーが発生しました。\n\n" + err,
                confirmMsg: "OK",
                cancelMsg: "キャンセル",
                state: messageStates.needConfirm,
                onConfirm: () => { setPopup(null); },
                onCancel: () => { setPopup(null); }
            });
        });
    }



    const deviceOptions = availableDevices.map((device: any) => {
        return ({
            label: `${device.deviceId} ${device.deviceType.name}`,
            value: device.id,
        });
    })

    const userOptions = availableUsers.map((user: any) => {
        return ({
            label: `${user.userId} - ${user.lastName} ${user.firstName}`,
            value: user.id,
        });
    }).sort()

    // console.log(deviceOptions);

    const backButton = (() => {
        console.log(Object.keys(searchParams).length > 1);
        if (Object.keys(searchParams).length == 1 && searchParams.deviceId != null) {
            return <PageBackButton text="機器一覧画面に戻る" href="/devices" />
        } else if (Object.keys(searchParams).length == 0) {
            return <PageBackButton text="管理画面へ戻る" href="/" />
        } else if (Object.keys(searchParams).length > 1) {
            return <PageBackButton text="詳細画面に戻る" href={`/lendings/${searchParams.id}`} />
        }

        return <PageBackButton text="戻る" href="/" />
    })()


    return (
        <>


            <form className={style.form}>
                <div>
                    {backButton}
                </div>
                <div>
                    <DatePicker className={style.input} placeholder="貸出日" onChange={setRentalStart} initialValue={rentalStart} label="貸出日" disabled={!editable} warning={rentalStartWarning} />
                    <DatePicker className={style.input} placeholder="返却日" onChange={setRentalEnd} initialValue={rentalEnd} label="返却日" warning={rentalEndWarning} />
                </div>
                <div>
                    <Selectable className={style.input} onChange={setDeviceId} initialValue={deviceId} options={deviceOptions} label={"貸出可能な機器"} noValueLabel="機器を選択してください" disabled={!editable} warning={deviceIdWarning} />
                    <Selectable className={style.input} onChange={setUserId} initialValue={userId} options={userOptions} label={"貸出ユーザ"} noValueLabel="ユーザを選択してください" disabled={!editable} warning={userIdWarning} />
                </div>
                <div>
                    <TextArea className={style.textarea} placeholder="備考があれば入力してください。" onChange={setRemarks} initialValue={remarks} label="備考" />
                </div>
                <div className={style.buttonWrapper}>
                    {editable ?
                        <Button className={style.onebutton} type={buttonStates.positive} text="貸出する" onClick={() => validateInputs(addNewLending)} /> :
                        <>
                            <Button className={style.twobutton} type={buttonStates.warning} text="返却する" onClick={warnBeforeReturn} />
                            <Button className={style.twobutton} type={buttonStates.detail} text="変更を保存する" onClick={editLending} />
                        </>
                    }
                </div>
            </form>
        </>
    );
}

export default LendingEdit;