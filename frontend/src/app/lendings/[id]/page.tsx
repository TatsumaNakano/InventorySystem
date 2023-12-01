"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import PropertyItem from "@/components/PropertyItem";
import { formatDate, formatByteSize, getAgeByBirthday, base64ToEmoji } from "@/utility/utility";
import Button from "@/components/Button";

import { buttonStates } from "@/utility/states";
import UserEmoji from "@/components/UserEmoji";
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from "recoil";
import { popupState } from "@/utility/recoilStates";
import { messageStates } from "@/components/MessagePopup";
import PageBackButton from "@/components/PageBackButton";

const LendingItem = () => {
    const [lendingData, setLendingData] = useState();
    const path = usePathname();

    const { push } = useRouter();//JSでページ移動する時に必要
    const [popup, setPopup] = useRecoilState(popupState); //確認画面ポップアップのState

    useEffect(() => {
        const getLendingData = async () => {
            const lendingid = path.substring(path.lastIndexOf('/') + 1)
            const query = await fetch(`${process.env.API_PATH}/api/Lending/id/${lendingid}`);
            const response = await query.json();
            setLendingData(response);
        }

        getLendingData();
    }, [path])

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
            push("/")
            // console.log(deleteItem)
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

    const lending = lendingData as any;

    if (!lending) return;
    console.log(lending);
    return (
        <>
            <PageBackButton text={"貸出状況一覧に戻る"} href="/" />
            <div className={style.lendingItem}>
                <div className={style.info}>
                    {/* Left Section */}
                    <div className={style.left}>
                        <div className={style.date}>
                            <label>貸出日</label>
                            <h5>{formatDate(lending.rentalStart)}</h5>
                        </div>
                        <div className={style.border}>
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
                        <div className={style.date}>
                            <label>返却日</label>
                            <h5>{formatDate(lending.rentalEnd)}</h5>
                        </div>
                        <div className={style.border}>
                            <div className={style.nameLabel}>
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
                            <PropertyItem label="社員番号" data={lending.user.userId} />
                            <PropertyItem label="部署" data={lending.user.department.name} />
                            <PropertyItem label="役職" data={lending.user.position.name} />
                            <PropertyItem label="備考" data={lending.remarks} breakLine messageOnNull="記入なし" />

                        </div>

                    </div>
                </div >
                <div className={style.buttonContainer}>
                    <Button className={style.button} type={buttonStates.warning} text="返却" noLinkMode onClick={warnBeforeReturn} />
                    <Button className={style.button} type={buttonStates.detail} text="編集" link={{
                        pathname: `/lendings/edit`,
                        query: lending
                    }} />
                </div>
            </div >
        </>
    );
}

export default LendingItem;