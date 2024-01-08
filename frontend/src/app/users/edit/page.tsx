"use client"

import DatePicker from "@/components/Inputs/DatePicker";
import TextInput from "@/components/Inputs/TextInput";
import style from "./style.module.scss"
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import { popupState } from "@/utility/recoilStates";
import Selectable from "@/components/Inputs/Selectable";
import { useEffect, useState } from "react";
import { fetchAndSet, validateEmail, validateKatakana, validateNameString, validateTelNumber, validateUserId } from "@/utility/utility";
import BinarySelection from "@/components/BinarySelection";
import TextArea from "@/components/Inputs/TextArea";
import { useRouter } from 'next/navigation';
import { useRecoilState } from "recoil";
import { messageStates } from "@/components/MessagePopup";
// import { emailRegex } from "@/utility/regex";

interface sqlInterface {
    id: Number,
    userId: string,
    firstName: string,
    lastName: string,
    kanaFirstName: string,
    kanaLastName: string,
    birthday: string | null,
    ageDeprecated: Number | null,
    sexId: Number | null,
    genderId: Number | null,
    telNumber: string,
    email: string,
    positionId: Number,
    departmentId: Number,
    isAdmin: Number,
    remarks: string | null,
    deactivated: Number,
    registrationDate: string | undefined | null,
    updateDate: string | undefined | null,
    leftDate: string | undefined | null
}


const UserEdit = ({ searchParams }: any) => {

    const { push } = useRouter();//JSでページ移動する時に必要

    const [popup, setPopup] = useRecoilState(popupState); //確認画面ポップアップのState
    const [params, setParams] = useState<sqlInterface>();//SearchParamsをAPI用のオブジェクトとして格納する

    const edit = Object.keys(searchParams).length > 0;

    //////////////////////////////////////
    // DBから取得したリスト
    //////////////////////////////////////
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [sexes, setSexes] = useState([]);
    const [genders, setGenders] = useState([]);


    //////////////////////////////////////
    // Searchparamsを格納するためのState
    //////////////////////////////////////
    const [id, setId] = useState(0);
    const [userId, setUserId] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [ageDeprecated, setAgeDeprecated] = useState(null);
    const [sexId, setSexId] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [kanaFirstName, setKanaFirstName] = useState("");
    const [kanaLastName, setKanaLastName] = useState("");
    const [deptId, setDeptId] = useState(-1);
    const [posId, setPosId] = useState(-1);
    const [telNumber, setTelNumber] = useState("");
    const [email, setEmail] = useState("");
    const [remarks, setRemarks] = useState(null);
    const [deactivated, setDeactivated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    // const [leftDate, setLeftDate] = useState(null);


    //////////////////////////////////////
    // 入力に不備がある場合のチェックState
    //////////////////////////////////////
    const [userIdWarning, setUserIdWarning] = useState<string | boolean>(false);
    const [birthdayWarning, setBirthdayWarning] = useState<string | boolean>(false);
    const [sexIdWarning, setSexIdWarning] = useState<string | boolean>(false);
    const [firstNameWarning, setFirstNameWarning] = useState<string | boolean>(false);
    const [lastNameWarning, setLastNameWarning] = useState<string | boolean>(false);
    const [kanaFirstNameWarning, setKanaFirstNameWarning] = useState<string | boolean>(false);
    const [kanaLastNameWarning, setKanaLastNameWarning] = useState<string | boolean>(false);
    const [deptIdWarning, setDeptIdWarning] = useState<string | boolean>(false);
    const [posIdWarning, setPosIdWarning] = useState<string | boolean>(false);
    const [telNumberWarning, setTelNumberWarning] = useState<string | boolean>(false);
    const [emailWarning, setEmailWarning] = useState<string | boolean>(false);
    const [isAdminWarning, setIsAdminWarning] = useState<string | boolean>(false);


    //////////////////////////////////////
    // 選択項目のリストを生成
    //////////////////////////////////////
    useEffect(() => {

        // 編集の場合
        if (edit) {
            const firstLoad = params == null;
            // console.log("searchParams", searchParams)
            if (firstLoad) setParams(searchParams);
            setId(firstLoad ? searchParams.id : params.id)
            setUserId(firstLoad ? searchParams.userId : params.userId);
            setBirthday(firstLoad ? searchParams.birthday : params.birthday);
            setAgeDeprecated(firstLoad ? searchParams.ageDeprecated : params.ageDeprecated)
            setSexId(firstLoad ? searchParams.sexId : params.sexId);
            setGenderId(firstLoad ? searchParams.genderId : params.genderId);
            setFirstName(firstLoad ? searchParams.firstName : params.firstName);
            setLastName(firstLoad ? searchParams.lastName : params.lastName);
            setKanaFirstName(firstLoad ? searchParams.kanaFirstName : params.kanaFirstName);
            setKanaLastName(firstLoad ? searchParams.kanaLastName : params.kanaLastName);
            setDeptId(firstLoad ? searchParams.departmentId : params.departmentId);
            setPosId(firstLoad ? searchParams.positionId : params.positionId);
            setTelNumber(firstLoad ? searchParams.telNumber : params.telNumber);
            setEmail(firstLoad ? searchParams.email : params.email);
            setRemarks(firstLoad ? searchParams.remarks : params.remarks);
            setDeactivated(firstLoad ? searchParams.deactivated : params.deactivated);
            setIsAdmin(firstLoad ? searchParams.isAdmin : params.isAdmin);
        }

        // DBから項目を取得
        fetchAndSet(`${process.env.API_PATH}/api/Misc/department`, setDepartments);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/position`, setPositions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/sex`, setSexes);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/gender`, setGenders);

    }, [searchParams])


    //////////////////////////////////////
    // APIリクエスト前の変数チェック。警告の表示Stateの操作
    //////////////////////////////////////
    const validateInputs = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {

        var somethingMissing = false;//入力に不備があった場合のフラグ

        if (!sexId) { somethingMissing = true; console.log("sexId Missing!", sexId) };
        if (!deptId) { somethingMissing = true; console.log("deptId Missing!", deptId) };
        if (!posId) { somethingMissing = true; console.log("posId Missing!", posId) };
        if (isAdmin == -1 || isAdmin == null || isAdmin == undefined) { somethingMissing = true; console.log("isAdmin Missing!", isAdmin) };

        setSexIdWarning(!sexId);

        /////////////////////////
        //社員番号の入力確認
        /////////////////////////
        if (!userId) {//入力なし
            setUserIdWarning("必須項目です。");
            console.log("userId", userId)
            somethingMissing = true;
        } else {//入力あり
            if (validateUserId(userId)) {//問題なし
                setUserIdWarning(false);
            } else {//形式に問題あり
                setUserIdWarning("形式を確認してください。");
                console.log("userId", userId)
                somethingMissing = true;
            }
        }

        /////////////////////////
        //誕生日の入力確認
        /////////////////////////
        if (birthday == null || birthday == "" || birthday == "T00:00:00") {//入力なし
            if (ageDeprecated == null) {
                setBirthdayWarning("必須項目です。");
                console.log("birthday", birthday);
                somethingMissing = true;
            } else {//古いシステムから来た年齢データが存在する場合は誕生日の入力を省く。（他の設定を変更するときに誕生日がないがために変更の保存が出来なくなるため。）
                setBirthdayWarning(false);
            }
        } else {//入力あり
            setBirthdayWarning(false);
        }

        /////////////////////////
        //性別の選択確認
        /////////////////////////
        if (!sexId) {//入力なし
            setSexIdWarning("必須項目です。");
            console.log("sexId", sexId);
            somethingMissing = true;
        } else {//入力あり
            setSexIdWarning(false);
        }

        /////////////////////////
        //名字(lastName)の入力確認
        /////////////////////////
        if (!lastName) {//入力なし
            setLastNameWarning("必須項目です。");
            console.log("lastName", lastName);
            somethingMissing = true;
        } else {
            if (validateNameString(lastName)) {//問題なし
                setLastNameWarning(false);
            } else {//形式に問題あり
                setLastNameWarning("不正な文字が使用されています。");
                console.log("lastName", lastName);
                somethingMissing = true;
            }
        }

        /////////////////////////
        //名前(firstName)の入力確認
        /////////////////////////
        if (!firstName) {//入力なし
            setFirstNameWarning("必須項目です。");
            console.log("firstName", firstName);
            somethingMissing = true;
        } else {
            if (validateNameString(firstName)) {//問題なし
                setFirstNameWarning(false);
            } else {//形式に問題あり
                setFirstNameWarning("不正な文字が使用されています。");
                console.log("firstName", firstName);
                somethingMissing = true;
            }
        }

        /////////////////////////
        //カナ名字(kanaLastName)の入力確認
        /////////////////////////
        if (!kanaLastName) {//入力なし
            setKanaLastNameWarning("必須項目です。");
            console.log("kanaLastName", kanaLastName);
            somethingMissing = true;
        } else {
            if (validateKatakana(kanaLastName)) {//問題なし
                setKanaLastNameWarning(false);
            } else {//形式に問題あり
                setKanaLastNameWarning("カタカナ以外の文字は使えません。");
                console.log("kanaLastName", kanaLastName);
                somethingMissing = true;
            }
        }

        /////////////////////////
        // カナ名前(kanaFirstName)の入力確認
        /////////////////////////
        if (!kanaFirstName) {//入力なし
            setKanaFirstNameWarning("必須項目です。");
            console.log("kanaFirstName", kanaFirstName);
            somethingMissing = true;
        } else {
            if (validateKatakana(kanaFirstName)) {//問題なし
                setKanaFirstNameWarning(false);
            } else {//形式に問題あり
                setKanaFirstNameWarning("カタカナ以外の文字は使えません。");
                console.log("kanaFirstName", kanaFirstName);
                somethingMissing = true;
            }
        }

        /////////////////////////
        //部署の選択確認
        /////////////////////////
        if (deptId == -1) {
            setDeptIdWarning("部署を選択してください。");
            console.log("deptId", deptId);
            somethingMissing = true;
        } else {
            setDeptIdWarning(false);
        }

        /////////////////////////
        //役職の選択確認
        /////////////////////////
        if (posId == -1) {
            setPosIdWarning("役職を選択してください。");
            console.log("posId", posId);
            somethingMissing = true;
        } else {
            setPosIdWarning(false);
        }


        /////////////////////////
        //電話番号の入力確認
        /////////////////////////
        if (!telNumber) {//入力なし
            setTelNumberWarning("必須項目です。");
            console.log("telNumber", telNumber);
            somethingMissing = true;
        } else {
            if (validateTelNumber(telNumber)) {//問題なし
                setTelNumberWarning(false);
            } else {//形式に問題あり
                setTelNumberWarning("半角数字のみ使用可能です。");
                console.log("telNumber", telNumber);
                somethingMissing = true;
            }
        }


        /////////////////////////
        //メールアドレスの入力確認
        /////////////////////////
        if (!email) {//入力なし
            setEmailWarning("必須項目です。");
            console.log("email", email);
            somethingMissing = true;
        } else {//入力あり
            if (validateEmail(email)) {//問題なし
                setEmailWarning(false);
            } else {//形式に問題あり
                setEmailWarning("形式を確認してください。");
                console.log("email", email);
                somethingMissing = true;
            }
        }


        /////////////////////////
        //権限の入力確認
        /////////////////////////
        if (isAdmin == null) {//入力なし
            setIsAdminWarning("必須項目です。");
            console.log("isAdmin", isAdmin);
            somethingMissing = true;
        } else {//入力あり
            setIsAdminWarning("形式を確認してください。");
            console.log("isAdmin", isAdmin);
        }

        console.log(somethingMissing)


        setIsAdminWarning(isAdmin == -1 || isAdmin == null || isAdmin == undefined);

        if (!somethingMissing) createOrModify(onsuccess, onerror);
    }

    //////////////////////////////////////
    // ポップアップメッセージ
    //////////////////////////////////////

    const confirmBeforeDeactivate = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `本当にユーザを無効にしますか？`,
            confirmMsg: "無効にする",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => { getLeftdate(onsuccess, onerror) },
            onCancel: () => setPopup(null)
        });
    }

    const getLeftdate = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {

        var leftDateString = "";//SetStateがうまく動かなかったので関数内で変数を宣言。。

        setPopup({
            message: `退社した場合は退社日を入力してください。`,
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needDateInput,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => { leftDateString = e.target.value },
            onConfirm: () => { deactivateUser(onsuccess, onerror, leftDateString) },
            onCancel: () => setPopup(null)
        });
    }

    const confirmBeforeActivate = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `ユーザを復帰しますか？`,
            confirmMsg: "復帰する",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => activateUser(onsuccess, onerror),
            onCancel: () => setPopup(null)
        });
    }

    //////////////////////////////////////
    // APIリクエスト
    //////////////////////////////////////
    const deactivateUser = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }, leftDateString: any) => {
        console.log(leftDateString)
        const body: sqlInterface = {
            "id": Number(id),
            "userId": userId,
            "firstName": firstName,
            "lastName": lastName,
            "kanaFirstName": kanaFirstName,
            "kanaLastName": kanaLastName,
            "birthday": birthday != "" ? birthday : null,
            "ageDeprecated": birthday != null ? null : ageDeprecated,
            "sexId": Number(sexId),
            "genderId": genderId == 0 ? null : genderId,
            "telNumber": telNumber,
            "email": email,
            "positionId": Number(posId),
            "departmentId": Number(deptId),
            "isAdmin": isAdmin ? 1 : 0,
            "remarks": remarks,
            "deactivated": 1,
            "registrationDate": params?.registrationDate,
            "updateDate": new Date().toISOString(),
            "leftDate": leftDateString == "" ? null : leftDateString
        }

        fetch(`https://localhost:7070/api/User/deactivate/${userId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body)
        }).then((msg) => {
            console.log(msg);
            push(`/users/${userId}`);
            setPopup(null);
            // onsuccess(msg);
        }).catch((err) => {
            console.log(err);
            // onerror(err);
        })
    }

    const activateUser = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {

        console.log(params?.leftDate);
        const body: sqlInterface = {
            "id": Number(id),
            "userId": userId,
            "firstName": firstName,
            "lastName": lastName,
            "kanaFirstName": kanaFirstName,
            "kanaLastName": kanaLastName,
            "birthday": birthday != "" ? birthday : null,
            "ageDeprecated": birthday != null ? null : ageDeprecated,
            "sexId": Number(sexId),
            "genderId": genderId == 0 ? null : genderId,
            "telNumber": telNumber,
            "email": email,
            "positionId": Number(posId),
            "departmentId": Number(deptId),
            "isAdmin": isAdmin ? 1 : 0,
            "remarks": remarks,
            "deactivated": 0,
            "registrationDate": params?.registrationDate,
            "updateDate": new Date().toISOString(),
            "leftDate": params?.leftDate == "" ? null : params?.leftDate,
        }

        fetch(`https://localhost:7070/api/User/activate/${userId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body)
        }).then((msg) => {
            console.log(msg);
            push(`/users/${userId}`);
            setPopup(null)
            // onsuccess(msg);
        }).catch((err) => {
            console.log(err);
            // onerror(err);
        })
    }

    const createOrModify = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {

        const hasParams = Object.keys(searchParams).length > 0;

        const body: sqlInterface = {
            "id": Number(id),
            "userId": userId,
            "firstName": firstName,
            "lastName": lastName,
            "kanaFirstName": kanaFirstName,
            "kanaLastName": kanaLastName,
            "birthday": birthday != "" ? birthday : null,
            "ageDeprecated": birthday != null ? null : ageDeprecated,
            "sexId": Number(sexId),
            "genderId": genderId == 0 ? null : genderId,
            "telNumber": telNumber,
            "email": email,
            "positionId": Number(posId),
            "departmentId": Number(deptId),
            "isAdmin": isAdmin ? 1 : 0,
            "remarks": remarks,
            "deactivated": Number(deactivated),
            "registrationDate": hasParams ? params?.registrationDate : new Date().toISOString(),
            "updateDate": new Date().toISOString(),
            "leftDate": params?.leftDate == "" ? null : params?.leftDate
        }

        if (!hasParams) { //Create
            fetch("https://localhost:7070/api/User", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(body)
            }).then((msg) => {
                console.log(msg);
                push(`/users/${userId}`);
                setPopup(null)
                // onsuccess(msg);
            }).catch((err) => {
                console.log(err);
                // onerror(err);
            })
        } else { //Edit
            console.log("hello")
            fetch(`https://localhost:7070/api/User/edit/${params?.userId}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(body)
            }).then((msg) => {
                console.log(msg);
                push(`/users/${userId}`);
                setPopup(null)
                // onsuccess(msg);
            }).catch((err) => {
                console.log(err);
                // onerror(err);
            })
        }

    }

    //////////////////////////////////////
    // 選択項目のリストを生成
    //////////////////////////////////////
    const deptOptions = departments.map((dept: any) => {
        return ({
            label: dept.name,
            value: dept.id,
        });
    })

    const posOptions = positions.map((pos: any) => {
        return ({
            label: pos.name,
            value: pos.id,
        });
    })

    const genderOptions = genders.map((gender: any) => {
        return ({
            label: gender.name,
            value: gender.id,
        });
    })

    //////////////////////////////////////
    // メイン
    //////////////////////////////////////

    return (
        <form className={style.form}>

            <div>
                <TextInput label="社員番号*" className={style.input} placeholder="例）X0123" onChange={setUserId} initialValue={userId ? userId : ""} warning={userIdWarning}></TextInput >
                <DatePicker label="誕生日*" className={style.input} placeholder="誕生日" onChange={setBirthday} initialValue={birthday ? birthday : null} warning={birthdayWarning} max={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
                <BinarySelection label="性別*" className={style.input} selectionA="男" selectionB="女" valA={1} valB={2} initialValue={sexId ? sexId : null} func={setSexId} warning={sexIdWarning} />
                <Selectable label="ジェンダー" className={style.input} onChange={setGenderId} initialValue={genderId ? genderId : -1} noValueLabel={"特になし"} options={genderOptions} />
            </div>
            <div>
                <TextInput label="名字*" className={style.input} placeholder="例）田中" onChange={setLastName} initialValue={lastName ? lastName : null} warning={lastNameWarning}></TextInput>
                <TextInput label="名前*" className={style.input} placeholder="例）太郎" onChange={setFirstName} initialValue={firstName ? firstName : null} warning={firstNameWarning}></TextInput >
            </div>
            <div>
                <TextInput label="カナ名字*" className={style.input} placeholder="例）タナカ" onChange={setKanaLastName} initialValue={kanaLastName ? kanaLastName : null} warning={kanaLastNameWarning}></TextInput >
                <TextInput label="カナ名前*" className={style.input} placeholder="例）タロウ" onChange={setKanaFirstName} initialValue={kanaFirstName ? kanaFirstName : null} warning={kanaFirstNameWarning}></TextInput >
            </div>
            <div>
                <Selectable label="部署*" className={style.input} onChange={setDeptId} initialValue={deptId ? deptId : -1} noValueLabel={"部署を選択してください"} options={deptOptions} warning={deptIdWarning} />
                <Selectable label="役職*" className={style.input} onChange={setPosId} initialValue={posId ? posId : -1} noValueLabel={"役職を選択してください"} options={posOptions} warning={posIdWarning} />
            </div>
            <div>
                <TextInput label="電話番号*" className={style.input} type="tel" placeholder="電話番号" onChange={setTelNumber} initialValue={telNumber ? telNumber : ""} warning={telNumberWarning}></TextInput >
                <TextInput label="メールアドレス*" className={style.input} type="email" placeholder="メールアドレス" onChange={setEmail} initialValue={email ? email : ""} warning={emailWarning}></TextInput >
            </div>
            <div>
                <BinarySelection label="権限*" className={style.isAdmin} selectionA="一般ユーザー" selectionB="管理者" valA={0} valB={1} initialValue={isAdmin ? isAdmin : null} func={setIsAdmin} warning={isAdminWarning} />
            </div>

            <div>
                <TextArea label="備考" className={style.textarea} placeholder="備考があれば入力してください。" onChange={setRemarks} initialValue={remarks ? remarks : null} />
            </div>

            <div className={style.buttonWrapper}>
                {Object.keys(searchParams).length > 0 && searchParams.deactivated == 0 ?
                    <Button className={style.twobutton} type={buttonStates.warning} text="ユーザを無効化する" onClick={() => { confirmBeforeDeactivate() }} /> :
                    null
                }
                {Object.keys(searchParams).length > 0 && searchParams.deactivated == 1 ?
                    <Button className={style.twobutton} type={buttonStates.detail} text="ユーザを復帰する" onClick={() => { confirmBeforeActivate() }} /> :
                    null
                }
                {Object.keys(searchParams).length > 0 ?
                    <Button className={style.twobutton} type={buttonStates.detail} text="変更を保存する" onClick={() => validateInputs()} /> :
                    <Button className={style.onebutton} type={buttonStates.positive} text="ユーザを登録する" onClick={() => validateInputs()} />
                }

                {/* link={`/users/${userId}`} */}


            </div>

        </form>
    );
}

export default UserEdit;