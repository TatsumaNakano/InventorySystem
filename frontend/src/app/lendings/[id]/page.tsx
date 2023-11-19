"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import Emoji from "@/components/DeviceEmoji";
import PropertyItem from "@/components/PropertyItem";
import { formatDate, formatByteSize, getAgeByBirthday } from "@/utility/utility";
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import DeviceEmoji from "@/components/DeviceEmoji";
import UserEmoji from "@/components/UserEmoji";
import { usePathname } from 'next/navigation'

const LendingItem = () => {
    const [lendingData, setLendingData] = useState();
    const path = usePathname();


    useEffect(() => {
        const getLendingData = async () => {
            const lendingid = path.substring(path.lastIndexOf('/') + 1)
            const query = await fetch(`${process.env.API_PATH}/api/Lending/id&${lendingid}`);
            const response = await query.json();
            setLendingData(response);
        }

        getLendingData();
    }, [path])

    const lending = lendingData as any;

    if (!lending) return;
    console.log(lending);
    return (
        <div className={style.lendingItem}>
            <div className={style.info}>
                {/* Left Section */}
                <div className={style.left}>
                    <div className={style.date}>
                        <label>貸出日</label>
                        <h5>{formatDate(lending.rentalStart)}</h5>
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
                    <div className={style.date}>
                        <label>返却日</label>
                        <h5>{formatDate(lending.rentalEnd)}</h5>
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

                    </div>
                    <PropertyItem label="備考" data={lending.remarks} breakLine messageOnNull="記入なし" />
                </div>
            </div >
            <div className={style.buttonContainer}>
                <Button className={style.button} type={buttonStates.warning} text="返却" link="/" />
                <Button className={style.button} type={buttonStates.detail} text="編集" link={{
                    pathname: `/lendings/edit`,
                    query: lending
                }} />
            </div>
        </div >
    );
}

export default LendingItem;