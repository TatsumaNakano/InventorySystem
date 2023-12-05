"use client"

import { useEffect, useState } from "react";
import { TupleType } from "typescript";
import style from "./style.module.scss"
import commonStyle from "@/components/styles/commom.module.scss"
import PropertyItem from "@/components/PropertyItem";
import { formatDate, convertMBtoGB, getAgeByBirthday } from "@/utility/utility";
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import UserEmoji from "@/components/UserEmoji";
import { usePathname, useRouter } from 'next/navigation'
import PageBackButton from "@/components/PageBackButton";

const UserData = () => {

    const [userData, setUserData] = useState();
    const path = usePathname();

    useEffect(() => {
        const getUserData = async () => {
            const userid = path.substring(path.lastIndexOf('/') + 1)
            const query = await fetch(`https://localhost:7070/api/User/userId/${userid}`);
            const response = await query.json();
            setUserData(response);
        }

        getUserData();
    }, [path])

    const user = userData as any;
    if (!user) return;
    console.log(user);
    return (
        <>
            <PageBackButton text={"ユーザ一覧に戻る"} href="/users" />
            <div className={`${style.userItem} ${user.deactivated == 0 ? style.normal : style.deactivated}`}>
                <div className={style.info}>
                    {/* Left Section */}
                    <div className={style.left}>
                        <div className={`${style.nameLabel} ${commonStyle.borderBottom}`}>

                            {/* Name */}
                            <div>
                                <h4 className={style.emoji}>
                                    <UserEmoji type={user.sex.id} />
                                </h4>
                                <h3 className={style.name}>
                                    <label>
                                        <span className={style.kana}>{user.kanaLastName}</span>
                                        <span className={style.kanji}>{user.lastName}</span>
                                    </label>
                                    <label>
                                        <span className={style.kana}>{user.kanaFirstName}</span>
                                        <span className={style.kanji}>{user.firstName}</span>
                                    </label>
                                </h3>
                            </div>
                            <div>
                                {user.deactivated == 1 ? <label className={style.deactivatedUser}>無効化されたユーザ</label> : null}
                            </div>
                        </div>
                        <div className={`${commonStyle.borderBottom} ${commonStyle.marginBottomOneRem} ${commonStyle.paddingBottomOneRem} `}>{/* Detail Info */}
                            {/* <DetailPropertyInfo item={item} /> */}
                            <PropertyItem label="社員番号" data={user.userId} />
                            <PropertyItem label="部署" data={user.department.name} />
                            <PropertyItem label="役職" data={user.position.name} />
                            <PropertyItem label="管理者権限" data={user.isAdmin ? "有" : "無"} />
                        </div>
                        <div>
                            <PropertyItem label="年齢" data={user.birthday == null ? user.ageDeprecated : getAgeByBirthday(user.birthday)} />
                            <PropertyItem label="性別" data={user.sex.name} />
                        </div>
                    </div>


                    {/* Right Section */}
                    <div className={style.right}>
                        <div>{/* 登録更新 */}
                            <PropertyItem label="📞" data={user.telNumber} copyable />
                            <PropertyItem label="📧" data={user.email} copyable />
                        </div>

                        <div>{/* 備考 */}
                            <PropertyItem label="備考" data={user.remarks} breakLine messageOnNull="記入なし" />
                        </div>

                    </div>
                </div >
                <div className={style.buttonContainer}>
                    <Button className={style.button} type={buttonStates.detail} text="編集" link={{ pathname: `/users/edit`, query: user }} />
                    {/* <Button type={buttonStates.detail} text="詳細情報" link={{
                    pathname: `/users/${user.userId}`,
                    query: user // the data
                }} /> */}
                </div>
            </div >
        </>
    );
}


export default UserData;