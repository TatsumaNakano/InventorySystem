"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Emoji from "../DeviceEmoji";
import PropertyItem from "../PropertyItem";
import { formatDate, formatByteSize, getAgeByBirthday } from "@/utility/utility";
import Button from "../Button";
import { buttonStates } from "@/utility/states";
import DeviceEmoji from "../DeviceEmoji";
import UserEmoji from "../UserEmoji";

const LendingDataDisplay = () => {

    const [lendingData, setLendingData] = useState([]);
    useEffect(() => {

        const getUserData = async () => {
            const query = await fetch("https://localhost:7070/api/Lending");
            const response = await query.json();
            setLendingData(response);
        }

        getUserData();
    }, []);

    return (
        <div className={style.lendingDataDisplay}>
            <LendingList data={lendingData} />
        </div>
    );
}

export default LendingDataDisplay;



const LendingList = ({ data }: any) => {
    console.log(data);
    return (
        <ul className={style.lendingList}>
            {data.map((lending: any) => {
                return <LendingItem lending={lending} key={lending.id} />
            })}
        </ul>
    );
}

const LendingItem = ({ lending }: any) => {
    console.log(lending);
    return (
        <li className={style.lendingItem}>
            <div className={style.info}>
                {/* Left Section */}
                <div className={style.left}>
                    <div>
                        <label>貸出日</label>
                        <label>{formatDate(lending.rentalStart)}</label>
                    </div>
                    <div>
                        <div className={style.nameLabel}>

                            <h4 className={style.emoji}>
                                <DeviceEmoji type={lending.device.deviceType.id} />
                            </h4>

                            <div>
                                <h3>{lending.device.deviceId}</h3>
                                {lending.device.oldName != null ? <label>{`旧名 ${lending.device.oldName}`}</label> : null}
                            </div>
                        </div>
                        <PropertyItem label="タイプ" data={lending.device.deviceType.name} />
                        <PropertyItem label="OS" data={lending.device.os.name} />
                        <PropertyItem label="メモリ" data={formatByteSize(lending.device.memory)} />
                        <PropertyItem label="容量" data={formatByteSize(lending.device.capacity)} />
                        <PropertyItem label="GPU" data={lending.device.hasGpu ? "有" : "無"} />
                    </div>

                </div>


                {/* Right Section */}
                <div className={style.right}>
                    <div>
                        <label>返却日</label>
                        <label>{formatDate(lending.rentalEnd)}</label>
                    </div>
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
                    <div>{/* 備考 */}
                        {/* <PropertyItem label="備考" data={user.remarks} breakLine messageOnNull="記入なし" /> */}
                    </div>

                </div>
            </div >
            <div className={style.buttonContainer}>
                <Button type={buttonStates.warning} text="返却" link="/" />
                <Button type={buttonStates.detail} text="編集" link="/" />
            </div>
        </li >
    );
}

