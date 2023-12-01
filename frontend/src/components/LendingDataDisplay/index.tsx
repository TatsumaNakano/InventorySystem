"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import PropertyItem from "../PropertyItem";
import { formatDate, formatByteSize, getAgeByBirthday, base64ToEmoji } from "@/utility/utility";
import Button from "../Button";
import { buttonStates } from "@/utility/states";
import UserEmoji from "../UserEmoji";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { popupState } from "@/utility/recoilStates";
import { messageStates } from "../MessagePopup";
import { parseISO } from "date-fns";
import Loading from "../Loading";

const LendingDataDisplay = ({ onConnected }: any) => {

    const [pageReady, setPageReady] = useState<boolean>(false);
    const [loadStatus, setLoadStatus] = useState<string>("");

    const [notDuelendings, setNotDueLendings] = useState([]);
    const [dueLendings, setDueLending] = useState([]);


    // const daypassed = parseISO(lending.rentalEnd) <= new Date();//期限日か過ぎている場合

    useEffect(() => {

        const getCurrentLendingData = async () => {
            try {
                const query = await fetch(`${process.env.API_PATH}/api/Lending`);

                if (!query.ok) {

                    setPageReady(false);
                    setLoadStatus("サーバーに接続できませんでした。");
                    throw new Error(`Failed to fetch data. Status: ${query.status}`);
                }

                const response = await query.json();
                const today = new Date();
                const resDueLendings = response.filter((lending: any) => parseISO(lending.rentalEnd) <= today);
                const resNotDueLendings = response.filter((lending: any) => parseISO(lending.rentalEnd) > today);

                setDueLending(resDueLendings);
                setNotDueLendings(resNotDueLendings);
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

        getCurrentLendingData();
    }, []);

    if (!pageReady) return <Loading message={loadStatus} />

    return (

        <div className={style.lendingDataDisplay}>
            {dueLendings.length > 0 ? <h5>返却期限の過ぎたもの</h5> : null}
            <LendingList data={dueLendings} setData={setDueLending} />

            {notDuelendings.length > 0 ? <h5>その他貸出中</h5> : null}
            <LendingList data={notDuelendings} setData={setNotDueLendings} />

        </div>
    );
}

export default LendingDataDisplay;



const LendingList = ({ data, setData }: any) => {
    // console.log(data);

    const deleteItem = (item: any) => {
        const index = data.indexOf(item);
        if (index !== -1) {
            const dataCopy = [...data];
            dataCopy.splice(index, 1);
            setData(dataCopy);
        }
    }

    return (
        <ul className={style.lendingList}>
            {data.map((lending: any) => {
                return <LendingItem lending={lending} deleteItem={deleteItem} key={lending.id} />
            })}
        </ul>
    );
}

const LendingItem = ({ lending, deleteItem }: any) => {

    // console.log(lending);
    const { push } = useRouter();//JSでページ移動する時に必要
    const [popup, setPopup] = useRecoilState(popupState); //確認画面ポップアップのState

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
        fetch(`${process.env.API_PATH}/api/Lending/delete/${lending.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((msg) => {
            console.log(msg);
            // console.log(deleteItem)
            deleteItem(lending);
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

    // console.log(lending)

    const daypassed = parseISO(lending.rentalEnd) <= new Date();//期限日か過ぎている場合

    return (
        <li className={style.lendingItem}>
            <div className={style.info}>
                {/* <div> */}
                {/* Left Section */}
                <div className={style.left}>
                    <div className={style.date}>
                        <label>貸出日</label>
                        <h5>{formatDate(lending.rentalStart)}</h5>
                    </div>
                    <div className={style.border} onClick={() => { push(`/devices/${lending.device.deviceId}`) }}>

                        <div className={style.nameLabel}>
                            <h4 className={style.emoji}>
                                {base64ToEmoji(lending.device.deviceType.emoji)}
                            </h4>
                            <div>
                                <h3>{lending.device.deviceId}</h3>
                                {lending.device.oldName != null ? <label>{`旧名 ${lending.device.oldName}`}</label> : null}
                            </div>
                        </div>
                        <PropertyItem label="タイプ" data={lending.device.deviceType.name} />
                        {lending.device.os != null ? <PropertyItem label="OS" data={lending.device.os.name} /> : null}
                        {lending.device.memory != null ? <PropertyItem label="メモリ" data={formatByteSize(lending.device.memory)} /> : null}
                        {lending.device.capacity != null ? <PropertyItem label="容量" data={formatByteSize(lending.device.capacity)} /> : null}
                        {lending.device.hasGpu != null ? <PropertyItem label="GPU" data={lending.device.hasGpu ? "有" : "無"} /> : null}
                    </div>
                </div>

                {/* Right Section */}
                <div className={style.right}>
                    <div className={`${style.date} ${daypassed ? style.due : null}`}>
                        <label>返却日</label>
                        <h5>{formatDate(lending.rentalEnd)}</h5>
                    </div>
                    <div className={`${style.border}`}>
                        <div className={`${style.nameLabel}`} onClick={() => { push(`/users/${lending.user.userId}`) }}>
                            <h4 className={style.emoji}>
                                <UserEmoji type={lending.user.sex.id} />
                            </h4>
                            <h3 className={style.name}>
                                <label>
                                    <span className={style.kana}>{lending.user.kanaLastName}</span>
                                    <span className={style.kanji}>{lending.user.lastName}</span>
                                </label>
                                <label>
                                    <span className={style.kana}>{lending.user.kanaFirstName}</span>
                                    <span className={style.kanji}>{lending.user.firstName}</span>
                                </label>
                            </h3>

                        </div>
                        <div>{/* 備考 */}
                            {/* <PropertyItem label="備考" data={user.remarks} breakLine messageOnNull="記入なし" /> */}
                            <PropertyItem label="社員番号" data={lending.user.userId} />
                            <PropertyItem label="部署" data={lending.user.department.name} />
                            <PropertyItem label="役職" data={lending.user.position.name} />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div >
            <div className={style.remarks}>
                <PropertyItem label="備考" data={lending.remarks} breakLine messageOnNull={"記入なし"} />
            </div>
            <div className={style.buttonContainer}>
                <Button className={style.button} type={buttonStates.warning} text="返却" noLinkMode onClick={warnBeforeReturn} />
                <Button className={style.button} type={buttonStates.detail} text="詳細情報" link={`/lendings/${lending.id}`} />
            </div>
        </li >
    );
}

