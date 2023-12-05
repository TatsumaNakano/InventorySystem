'use client'

import DatePicker from "@/components/Inputs/DatePicker";
import TextInput from "@/components/Inputs/TextInput";
import style from "./style.module.scss"
import Button from "@/components/Button";
import { buttonStates } from "@/utility/states";
import Selectable from "@/components/Inputs/Selectable";
import { useEffect, useState } from "react";
import { emojiToBase64, fetchAndSet, formatDate, generateUUID, getJSTDateTimeString } from "@/utility/utility";
import TextArea from "@/components/Inputs/TextArea";
import BytesInput from "@/components/Inputs/BytesInput";
import BinarySelection from "@/components/BinarySelection";
import { useRecoilState } from "recoil";
import { popupState } from "@/utility/recoilStates";
import { messageStates } from "@/components/MessagePopup";
import { useRouter } from 'next/navigation';
import PageBackButton from "@/components/PageBackButton";

const DeviceEdit = ({ searchParams }: any) => {

    const { push } = useRouter();//JSでページ移動する時に必要
    const [popup, setPopup] = useRecoilState(popupState); //確認画面ポップアップのState

    //////////////////////////////////////
    // DBから取得したリスト
    //////////////////////////////////////
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const [storagePlaceOptions, setStoragePlaceOptions] = useState([]);
    const [deviceMakerOptions, setDeviceMakerOptions] = useState([]);
    const [osOptions, setOsOptions] = useState([]);

    //////////////////////////////////////
    // Searchparamsを格納するためのState
    //////////////////////////////////////
    const [id, setId] = useState(-1);
    const [deviceId, setDeviceId] = useState(-1);
    const [deviceTypeId, setDeviceTypeId] = useState(-1);
    const [leaseStartDate, setLeaseStartDate] = useState();
    const [leaseEndDate, setLeaseEndDate] = useState();
    const [inventoryDate, setInventoryDate] = useState();
    const [registrationDate, setRegistrationDate] = useState();
    const [brokenFlag, setBrokenFlag] = useState();
    const [deleteFlag, setDeleteFlag] = useState();
    const [remarks, setRemarks] = useState(null);
    const [placeId, setPlaceId] = useState(-1);
    const [makerId, setMakerId] = useState(-1);
    const [osId, setOsId] = useState(-1);
    const [memory, setMemory] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [hasGpu, setHasGpu] = useState(false);



    //////////////////////////////////////
    // 項目表示変更のためのState
    //////////////////////////////////////
    const [isComputer, setIsComputer] = useState(false);

    //////////////////////////////////////
    // SelectのDeleteButtonState
    //////////////////////////////////////
    const [deviceTypeDeleteButton, setDeviceTypeDeleteButton] = useState<boolean>(false);
    const [makerDeleteButton, setMakerDeleteButton] = useState<boolean>(false);
    const [osDeleteButton, setOsDeleteButton] = useState<boolean>(false);
    const [storagePlaceDeleteButton, setStoragePlaceDeleteButton] = useState<boolean>(false);


    //////////////////////////////////////
    // 新しいプロパティ用のState
    //////////////////////////////////////
    // const [newDeviceTypeName, setNewDeviceTypeName] = useState<string | null>(null);
    // const [newDeviceTypePrefix, setNewDeviceTypePrefix] = useState<string | null>(null);
    // const [newMakerName, setNewMakerName] = useState<string | null>(null);
    // const [newOperationSytem, setNewOperationSytem] = useState<string | null>(null);
    // const [newStoragePlace, setNewStoragePlace] = useState<string | null>(null);

    //////////////////////////////////////
    // 入力に不備がある場合のチェックState
    //////////////////////////////////////

    const [deviceTypeIdWarning, setDeviceTypeIdWarning] = useState<string | boolean>(false);
    // const [leaseStartDateWarning, setLeaseStartDateWarning] = useState<string | boolean>(false);
    // const [leaseEndDateWarning, setLeaseEndDateWarning] = useState<string | boolean>(false);
    // const [inventoryDateWarning, setInventoryDateWarning] = useState<string | boolean>(false);
    const [placeIdWarning, setPlaceIdWarning] = useState<string | boolean>(false);
    // const [makerIdWarning, setMakerIdWarning] = useState<string | boolean>(false);
    const [osIdWarning, setOsIdWarning] = useState<string | boolean>(false);
    const [memoryWarning, setMemoryWarning] = useState<string | boolean>(false);
    const [capacityWarning, setCapacityWarning] = useState<string | boolean>(false);
    const [hasGpuWarning, setHasGpuWarning] = useState<string | boolean>(false);

    //////////////////////////////////////
    // 選択項目のリストを生成
    //////////////////////////////////////

    useEffect(() => {

        if (Object.keys(searchParams).length > 0) {
            setId(searchParams.id)
            setDeviceId(searchParams.deviceId);
            setDeviceTypeId(searchParams.deviceTypeId);
            setLeaseStartDate(searchParams.leaseStartDate);
            setLeaseEndDate(searchParams.leaseEndDate);
            setInventoryDate(searchParams.inventoryDate);
            setRegistrationDate(searchParams.registrationDate);
            setRemarks(searchParams.remarks);
            setPlaceId(searchParams.placeId);
            setMakerId(searchParams.makerId);
            setBrokenFlag(searchParams.brokenFlag);
            setDeleteFlag(searchParams.deleteFlag);
            setOsId(searchParams.osId);
            setMemory(searchParams.memory);
            setCapacity(searchParams.capacity);
            setHasGpu(searchParams.hasGpu);

        }

        fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceType`, setDeviceTypeOptions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/storagePlace`, setStoragePlaceOptions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceMaker`, setDeviceMakerOptions);
        fetchAndSet(`${process.env.API_PATH}/api/Misc/os`, setOsOptions);

    }, [])



    //////////////////////////////////////
    // APIリクエスト前の変数チェック。警告の表示Stateの操作
    //////////////////////////////////////

    const validateInputs = (onValidationSuccess = () => { }) => {
        var somethingMissing = false;//入力に不備があった場合のフラグ

        // console.log("deviceTypeId", deviceTypeId)
        // console.log("placeId", placeId)

        if (deviceTypeId == -1) {
            setDeviceTypeIdWarning("必須項目です。");
            somethingMissing = true;
        } else {
            setDeviceTypeIdWarning(false);
        }

        // console.log("placeId", placeId);
        if (placeId == -1) {
            setPlaceIdWarning("必須項目です。");
            somethingMissing = true;
        } else {
            setPlaceIdWarning(false);
        }

        if (isComputer) {
            console.log(osId)
            if (osId != -1) {
                setOsIdWarning(false);
            } else {
                somethingMissing = true;
                setOsIdWarning("必須項目です。")
            }

            if (memory != null) {
                setMemoryWarning(false);
            } else {
                somethingMissing = true;
                setMemoryWarning("必須項目です。")
            }


            if (capacity != null) {
                setCapacityWarning(false);
            } else {
                somethingMissing = true;
                setCapacityWarning("必須項目です。");
            }


            if (hasGpu != null) {
                setHasGpuWarning(false);
            } else {
                somethingMissing = true;
                setHasGpuWarning("必須項目です。");
            }
        }

        if (!somethingMissing) {
            onValidationSuccess()
        };

    }


    //////////////////////////////////////
    // ポップアップメッセージ
    //////////////////////////////////////
    const confirmBeforeDeactivate = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `本当に機器を無効にしますか？`,
            confirmMsg: "無効にする",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => { checkIsBroken(onsuccess, onerror) },
            onCancel: () => setPopup(null)
        });
    }

    const checkIsBroken = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `修理の予定はありますか？`,
            confirmMsg: "修理予定",
            cancelMsg: "破棄予定",
            state: messageStates.needSelection,
            onConfirm: () => { getDeactivationRemarks(onsuccess, onerror, true); },
            onCancel: () => { getDeactivationRemarks(onsuccess, onerror, false); }
        });
    }

    const getDeactivationRemarks = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }, isBroken: boolean) => {
        var detailText = remarks;
        const date = getJSTDateTimeString(new Date());

        setPopup({
            message: isBroken ? `故障の内容を記入してください。` : `破棄する理由を記入してください。`,
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needDetailInput,
            onChange: (txt: any) => { detailText = txt; },
            onConfirm: () => { deactivateDevice(onsuccess, onerror, isBroken, detailText + " " + date + (!remarks ? "\n\n" : "") + remarks); },
            onCancel: () => { setPopup(null); }
        });
    }

    const getActivationRemarks = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        var detailText = remarks;
        const date = getJSTDateTimeString(new Date());

        setPopup({
            message: `復帰する理由を記入してください。`,
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needDetailInput,
            onChange: (txt: any) => { detailText = txt; },
            onConfirm: () => { activateDevice(onsuccess, onerror, detailText + " " + date + (remarks != "" ? "\n\n" : "") + remarks); },
            onCancel: () => { setPopup(null); }
        });
    }

    const confirmBeforeActivateBrokenAndDeletedDevice = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `故障して削除された機器を有効にしようとしています。本当に機器を有効にしますか？`,
            confirmMsg: "有効にする",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => { getActivationRemarks(onsuccess, onerror) },
            onCancel: () => setPopup(null)
        });
    }

    const confirmBeforeActivateBrokenDevice = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `故障した機器を有効にしようとしています。本当に機器を有効にしますか？`,
            confirmMsg: "有効にする",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => { getActivationRemarks(onsuccess, onerror) },
            onCancel: () => setPopup(null)
        });
    }


    const confirmBeforeActivateDeletedDevice = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }) => {
        setPopup({
            message: `削除された機器を有効にしようとしています。本当に機器を有効にしますか？`,
            confirmMsg: "有効にする",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => { activateDevice(onsuccess, onerror) },
            onCancel: () => setPopup(null)
        });
    }


    //////////////////////////////////////
    // Select関連の処理
    //////////////////////////////////////
    const createDeviceType = () => {

        var deviceTypeName: string | null = null;
        var deviceTypePrefix: string | null = null;
        var deviceTypeEmoji: string | null = null;
        var validName: boolean = false;
        var validPrefix: boolean = false;

        setPopup({
            message: "新しい機器タイプの名前を入力してください。",
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needStringInput,
            onConfirm: () => {

                if (validName) {
                    setPopup(null)//テキストインプットを消すため
                    setTimeout(() => {
                        setPopup({
                            message: "新しいタイプのプレフィックスを入力してください。",
                            confirmMsg: "OK",
                            cancelMsg: "キャンセル",
                            state: messageStates.needStringInput,
                            onConfirm: () => {
                                // console.log(deviceTypeName, deviceTypePrefix)

                                setPopup({
                                    message: "新しい機器タイプの絵文字を入力してください。",
                                    confirmMsg: "OK",
                                    cancelMsg: "キャンセル",
                                    state: messageStates.needEmojiInput,
                                    onConfirm: () => {
                                        setPopup({
                                            message: "この機器はコンピュータですか？（メモリ、ストレージ、OS、GPUなどを搭載していますか？）",
                                            confirmMsg: "搭載している",
                                            cancelMsg: "搭載していない",
                                            state: messageStates.needSelection,
                                            onConfirm: () => {
                                                if (deviceTypeName && deviceTypePrefix && deviceTypeEmoji) {
                                                    // console.log("Should be called")
                                                    addDeviceType(deviceTypeName, deviceTypePrefix, (deviceTypeEmoji), true)
                                                }
                                            },
                                            onCancel: () => {
                                                if (deviceTypeName && deviceTypePrefix && deviceTypeEmoji) {
                                                    // console.log("Should be called")
                                                    addDeviceType(deviceTypeName, deviceTypePrefix, (deviceTypeEmoji), false)
                                                }
                                            },
                                            onChange: (emoji: any) => {
                                                deviceTypeEmoji = emojiToBase64(emoji.emoji);
                                            },
                                        })
                                    },
                                    onCancel: () => {
                                        setPopup(null)
                                    },
                                    onChange: (emoji: any) => {
                                        // var newPopup = { ...popup };
                                        // newPopup.selectedValue = emoji;
                                        // setPopup(newPopup);
                                        deviceTypeEmoji = emojiToBase64(emoji.emoji);
                                    },
                                })
                            },
                            onCancel: () => { setPopup(null); },
                            onChange: (text: string) => {

                                if (deviceTypeOptions.filter((deviceType: any) => deviceType.devicePrefix == text).length == 0 && text) {
                                    // console.log(deviceTypePrefix)
                                    deviceTypePrefix = text;
                                    validPrefix = true;
                                } else {
                                    validPrefix = false;
                                }

                            },
                            labelText: "新しい機器タイプのプレフィックス",
                            placeholder: "例）DP, NPなど"
                        })
                    }, 1)
                } else {

                }
            },
            onCancel: () => { setPopup(null); },
            onChange: (text: string) => {
                // console.log(validName);
                // console.log(deviceTypeOptions);
                if (deviceTypeOptions.filter((deviceType: any) => deviceType.name == text).length == 0 && text) {
                    deviceTypeName = text;
                    validName = true;
                } else {
                    validName = false;
                }
            },
            labelText: "新しいタイプ名",
            placeholder: "例）デスクトップPC",
            // validInput: validName
        });
    }

    const deleteDeviceTypeActionButton = (value: any) => {
        const type: any = deviceTypeOptions.filter((dt: any) => dt.id == value)[0];
        // console.log(type)
        setPopup({
            message: `機器タイプ「${type.name}」を削除しますか？`,
            confirmMsg: "削除する",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => {
                deleteDeviceType();
                setDeviceTypeDeleteButton(false);

                setPopup(null);
            },
            onCancel: () => { setPopup(null); }
        });
    }

    const createDeviceMaker = () => {

        var makerName: string | null = null;
        var validName: boolean = false;

        setPopup({
            message: "新しいメーカーの名前を入力してください。",
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needStringInput,
            onConfirm: () => {
                if (validName && makerName) {
                    addMaker(makerName);
                }
            },
            onCancel: () => { setPopup(null); },
            onChange: (text: string) => {
                // console.log(validName);
                // console.log(deviceTypeOptions);
                if (deviceMakerOptions.filter((deviceMaker: any) => deviceMaker.name == text).length == 0 && text) {
                    makerName = text;
                    validName = true;
                } else {
                    validName = false;
                }
            },
            labelText: "新しいメーカー名",
            placeholder: "例）Apple, Dell",
            // validInput: validName
        });
    }

    const deleteMakerActionButton = (value: any) => {
        const type: any = deviceMakerOptions.filter((dm: any) => dm.id == value)[0];
        // console.log(type)
        setPopup({
            message: `メーカー「${type.name}」を削除しますか？`,
            confirmMsg: "削除する",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => {
                deleteMaker();
                setMakerDeleteButton(false);
                setPopup(null);
            },
            onCancel: () => { setPopup(null); }
        });
    }

    const createOperationSystem = () => {

        var osName: string | null = null;
        var validName: boolean = false;

        setPopup({
            message: "新しいOSの名前を入力してください。",
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needStringInput,
            onConfirm: () => {
                if (validName && osName) {
                    addOperationSystem(osName);
                }
            },
            onCancel: () => { setPopup(null); },
            onChange: (text: string) => {
                if (osOptions.filter((os: any) => os.name == text).length == 0 && text) {
                    osName = text;
                    validName = true;
                } else {
                    validName = false;
                }
            },
            labelText: "新しいOS名",
            placeholder: "例）Mac, Windows",
            // validInput: validName
        });
    }

    const deleteOperationSystemActionButton = (value: any) => {
        const type: any = osOptions.filter((os: any) => os.id == value)[0];
        // console.log(type)
        setPopup({
            message: `OS「${type.name}」を削除しますか？`,
            confirmMsg: "削除する",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => {
                deleteOperationSystem();
                setOsDeleteButton(false);
                setPopup(null);
            },
            onCancel: () => { setPopup(null); }
        });
    }

    const createStoragePlace = () => {

        var storagePlaceName: string | null = null;
        var validName: boolean = false;

        setPopup({
            message: "新しい保管場所の名前を入力してください。",
            confirmMsg: "OK",
            cancelMsg: "キャンセル",
            state: messageStates.needStringInput,
            onConfirm: () => {
                if (validName && storagePlaceName) {
                    addStoragePlace(storagePlaceName);
                }
            },
            onCancel: () => { setPopup(null); },
            onChange: (text: string) => {
                // console.log(validName);
                // console.log(deviceTypeOptions);
                if (storagePlaceOptions.filter((sp: any) => sp.name == text).length == 0 && text) {
                    storagePlaceName = text;
                    validName = true;
                } else {
                    validName = false;
                }
            },
            labelText: "新しい保管場所名",
            placeholder: "例）classroom-001",
            // validInput: validName
        });
    }

    const deleteStoragePlaceActionButton = (value: any) => {
        const type: any = storagePlaceOptions.filter((sp: any) => sp.id == value)[0];
        // console.log(type)
        setPopup({
            message: `保管場所「${type.name}」を削除しますか？`,
            confirmMsg: "削除する",
            cancelMsg: "キャンセル",
            state: messageStates.needSelection,
            onConfirm: () => {
                deleteStoragePlace();
                setStoragePlaceDeleteButton(false);
                setPopup(null);
            },
            onCancel: () => { setPopup(null); }
        });
    }


    useEffect(() => {
        // console.log(deviceTypeId)
        if (deviceTypeId != -1) {
            hasAnyDeviceOnThisDeviceType(deviceTypeId)
                .then((msg) => {
                    // console.log(msg);
                    setDeviceTypeDeleteButton(!msg);
                })
        }
    }, [deviceTypeId])

    useEffect(() => {
        // console.log(deviceTypeId)
        if (deviceTypeId && deviceTypeId != -1) {
            const dt: any = deviceTypeOptions.filter((dt: any) => dt.id == deviceTypeId)[0];
            if (dt)
                setIsComputer(dt.isComputer);
        }
    }, [deviceTypeId, deviceTypeOptions])




    useEffect(() => {
        // console.log(deviceTypeId)
        if (makerId && makerId != -1) {
            hasAnyDeviceOnThisMaker(makerId)
                .then((msg) => {
                    // console.log(msg);
                    setMakerDeleteButton(!msg);
                })
        }
    }, [makerId])


    useEffect(() => {
        console.log(osId)
        if (osId && osId != -1) {
            hasAnyDeviceOnThisOs(osId)
                .then((msg) => {
                    console.log(msg);
                    setOsDeleteButton(!msg);
                })
        }
    }, [osId])


    useEffect(() => {
        // console.log(deviceTypeId)
        if (placeId && placeId != -1) {
            hasAnyDeviceOnThisPlace(placeId)
                .then((msg) => {
                    // console.log(msg);
                    setStoragePlaceDeleteButton(!msg);
                })
        }
    }, [placeId])

    // console.log(deviceTypeOptions)


    //////////////////////////////////////
    // APIリクエスト
    //////////////////////////////////////

    const deactivateDevice = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }, isBroken: boolean, detailText: string) => {
        // console.log("Send deactivation request")
        // console.log("detailText", detailText);

        const req = {
            "deviceId": deviceId,
            "deviceTypeId": Number(deviceTypeId),
            "brokenFlag": Number(isBroken),
            "leaseStartDate": leaseStartDate,
            "leaseEndDate": leaseEndDate,
            "inventoryDate": inventoryDate,
            "remarks": detailText,
            "deleteFlag": Number(!isBroken),
            "registrationDate": registrationDate,
            "updateDate": new Date().toISOString(),
            "placeId": Number(placeId),
            "makerId": Number(makerId),
            "osId": isComputer ? Number(osId) : null,
            "memory": isComputer ? Number(memory) : null,
            "capacity": isComputer ? Number(capacity) : null,
            "hasGpu": isComputer ? Number(hasGpu) : null,
            "tempId": null
        }

        // console.log(req);

        fetch(`${process.env.API_PATH}/api/Device/deactivate`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(req),
        }).then((msg) => {
            // console.log(msg);
            push(`/devices/${deviceId}`);
            setPopup(null);
        }).catch((err) => {
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

    const activateDevice = (onsuccess = (msg: any) => { }, onerror = (err: any) => { }, detailText = "") => {

        const req = {
            "deviceId": deviceId,
            "deviceTypeId": Number(deviceTypeId),
            "brokenFlag": 0,
            "leaseStartDate": leaseStartDate,
            "leaseEndDate": leaseEndDate,
            "inventoryDate": inventoryDate,
            "remarks": detailText,
            "deleteFlag": 0,
            "registrationDate": registrationDate,
            "updateDate": new Date().toISOString(),
            "placeId": Number(placeId),
            "makerId": Number(makerId),
            "osId": isComputer ? Number(osId) : null,
            "memory": isComputer ? Number(memory) : null,
            "capacity": isComputer ? Number(capacity) : null,
            "hasGpu": isComputer ? Number(hasGpu) : null,
            "tempId": null
        }

        // console.log(req);

        fetch(`${process.env.API_PATH}/api/Device/activate`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(req),
        }).then((msg) => {
            // console.log(msg);
            push(`/devices/${deviceId}`);
            setPopup(null);
        }).catch((err) => {
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

    const editDevice = () => {

        const body = {
            "id": id,
            "deviceId": deviceId,
            "deviceTypeId": Number(deviceTypeId),
            "brokenFlag": Number(brokenFlag) ? 1 : 0,
            "leaseStartDate": leaseStartDate,
            "leaseEndDate": leaseEndDate,
            "inventoryDate": inventoryDate,
            "remarks": remarks,
            "deleteFlag": Number(deleteFlag) ? 1 : 0,
            "registrationDate": registrationDate,
            "updateDate": new Date().toISOString(),
            "placeId": Number(placeId),
            "makerId": Number(makerId),
            "osId": isComputer ? Number(osId) : null,
            "memory": isComputer ? Number(memory) : null,
            "capacity": isComputer ? Number(capacity) : null,
            "hasGpu": isComputer ? Number(hasGpu) : null
        }

        console.log(body)

        fetch(`${process.env.API_PATH}/api/Device/edit`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body)
        }).then((msg) => {
            // console.log(msg);
            push(`/devices/${deviceId}`);
            setPopup(null);
        }).catch((err) => {
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

    const createDevice = () => {

        const uuid = generateUUID();

        const req = {
            "deviceId": "",
            "deviceTypeId": Number(deviceTypeId),
            "brokenFlag": 0,
            "leaseStartDate": leaseStartDate,
            "leaseEndDate": leaseEndDate,
            "inventoryDate": inventoryDate,
            "remarks": remarks,
            "deleteFlag": 0,
            "registrationDate": new Date().toISOString(),
            "updateDate": new Date().toISOString(),
            "placeId": placeId,
            "makerId": Number(makerId),
            "osId": isComputer ? Number(osId) : null,
            "memory": isComputer ? Number(memory) : null,
            "capacity": isComputer ? Number(capacity) : null,
            "hasGpu": isComputer ? Number(hasGpu) : null,
            "tempId": uuid
        }

        console.log("req", req);

        fetch(`${process.env.API_PATH}/api/Device`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(req)
        }).then((msg) => {
            // console.log(msg);
            const getDeviceId = async () => {
                const query = await fetch(`${process.env.API_PATH}/api/Device/tempIdToDeviceId/${uuid}`);
                const response = await query.text();
                push(`/devices/${response}`);
            }
            getDeviceId();
        }).catch((err) => {
            console.error(err);
            setPopup({
                message: "エラーが発生しました。\n\n" + err,
                confirmMsg: "OK",
                cancelMsg: "キャンセル",
                state: messageStates.needConfirm,
                onConfirm: () => { setPopup(null); },
                onCancel: () => { setPopup(null); }
            })
        })

    }

    const addDeviceType = (deviceTypeName: string, deviceTypePrefix: string, deviceTypeEmoji: string, isComputer: boolean) => {
        fetch(`${process.env.API_PATH}/api/Misc/addDeviceType/${deviceTypeName}&${deviceTypePrefix}&${deviceTypeEmoji}&${isComputer ? 1 : 0}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((msg) => {
            // console.log(msg)
            setPopup(null);

            const refetchDeviceType = async () => {
                const query = await fetch(`${process.env.API_PATH}/api/Misc/deviceType`);
                const response = await query.json();
                setDeviceTypeOptions(response);
                setDeviceTypeId(response.filter((dt: any) => dt.name == deviceTypeName)[0].id);
            }
            refetchDeviceType()


        }).catch((err) => {
            console.warn(err)
        })
    }

    const deleteDeviceType = () => {
        fetch(`${process.env.API_PATH}/api/Misc/deleteDeviceType/${deviceTypeId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(() => {
            fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceType`, setDeviceTypeOptions);
        })
    }

    const addMaker = (makerName: string) => {
        fetch(`${process.env.API_PATH}/api/Misc/addMaker/${makerName}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((msg) => {
            // console.log(msg)
            setPopup(null);

            const refetchDeviceMaker = async () => {
                const query = await fetch(`${process.env.API_PATH}/api/Misc/deviceMaker`);
                const response = await query.json();
                setDeviceMakerOptions(response);
                setMakerId(response.filter((dm: any) => dm.name == makerName)[0].id);
            }
            refetchDeviceMaker()


        }).catch((err) => {
            console.warn(err)
        })
    }

    const deleteMaker = () => {
        fetch(`${process.env.API_PATH}/api/Misc/deleteMaker/${makerId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(() => {
            fetchAndSet(`${process.env.API_PATH}/api/Misc/deviceMaker`, setDeviceMakerOptions);
        })
    }

    const addOperationSystem = (osName: string) => {
        fetch(`${process.env.API_PATH}/api/Misc/addOperationSystem/${osName}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((msg) => {
            // console.log(msg)
            setPopup(null);

            const refetchOperationSystem = async () => {
                const query = await fetch(`${process.env.API_PATH}/api/Misc/os`);
                const response = await query.json();
                setOsOptions(response);
                setOsId(response.filter((os: any) => os.name == osName)[0].id);
            }
            refetchOperationSystem()


        }).catch((err) => {
            console.warn(err)
        })
    }
    // fetchAndSet(`${process.env.API_PATH}/api/Misc/os`, setOsOptions);
    const deleteOperationSystem = () => {
        fetch(`${process.env.API_PATH}/api/Misc/deleteOs/${osId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(() => {
            fetchAndSet(`${process.env.API_PATH}/api/Misc/os`, setOsOptions);
        })
    }

    const addStoragePlace = (placeName: string) => {
        fetch(`${process.env.API_PATH}/api/Misc/addStoragePlace/${placeName}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then((msg) => {
            // console.log(msg)
            setPopup(null);

            const refetchOperationSystem = async () => {
                const query = await fetch(`${process.env.API_PATH}/api/Misc/storagePlace`);
                const response = await query.json();
                setStoragePlaceOptions(response);
                var newItem = response.filter((p: any) => p.name == placeName);
                if (newItem.length > 0) {
                    setPlaceId(newItem[0].id);
                }
            }
            refetchOperationSystem()


        }).catch((err) => {
            console.warn(err)
        })
    }
    // fetchAndSet(`${process.env.API_PATH}/api/Misc/os`, setOsOptions);
    const deleteStoragePlace = () => {
        fetch(`${process.env.API_PATH}/api/Misc/deleteStoragePlace/${placeId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(() => {
            fetchAndSet(`${process.env.API_PATH}/api/Misc/storagePlace`, setStoragePlaceOptions);
        })
    }



    const hasAnyDeviceOnThisDeviceType = async (deviceTypeId: Number) => {
        const url = `${process.env.API_PATH}/api/Misc/hasAnyDeviceOnThisDeviceType/${deviceTypeId}`;
        const query = await fetch(url);
        const request = await query.text();
        return JSON.parse(request);
    }

    const hasAnyDeviceOnThisMaker = async (makerId: Number) => {
        const url = `${process.env.API_PATH}/api/Misc/hasAnyDeviceOnThisMaker/${makerId}`;
        const query = await fetch(url);
        const request = await query.text();
        return JSON.parse(request);
    }

    const hasAnyDeviceOnThisOs = async (osId: Number) => {
        const url = `${process.env.API_PATH}/api/Misc/hasAnyDeviceOnThisOs/${osId}`;
        const query = await fetch(url);
        const request = await query.text();
        console.log("hasAnyDeviceOnThisOs", request)
        return JSON.parse(request);
    }

    const hasAnyDeviceOnThisPlace = async (storagePlace: Number) => {
        const url = `${process.env.API_PATH}/api/Misc/hasAnyDeviceOnThisStoragePlace/${storagePlace}`;
        const query = await fetch(url);
        const request = await query.text();
        return JSON.parse(request);
    }


    //////////////////////////////////////
    // 選択項目のリストを生成
    //////////////////////////////////////

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

    var buttons = [];
    if (brokenFlag != undefined && deleteFlag != undefined) {
        if ((brokenFlag == 0) && (deleteFlag == 0)) {//正常（壊れてもいないし削除もされていない）
            // console.log("正常（壊れてもいないし削除もされていない）");
            buttons.push(<Button className={style.twobutton} type={buttonStates.warning} text="機器を無効化する" onClick={() => { confirmBeforeDeactivate() }} key="deactivate" />);
        } else if ((brokenFlag == 1) && (deleteFlag == 1)) {//壊れたので在庫から削除されている（壊れていてなおかつ削除されている）
            // console.log("壊れたので在庫から削除されている（壊れていてなおかつ削除されている）");
            buttons.push(<Button className={style.twobutton} type={buttonStates.detail} text="機器を有効化する" onClick={() => { confirmBeforeActivateBrokenAndDeletedDevice() }} key="activate1" />);
        } else if ((brokenFlag == 0) && (deleteFlag == 1)) {//壊れてないけど消されている（古くなっていらなくなった場合など）
            // console.log("壊れてないけど消されている（古くなっていらなくなった場合など）");
            buttons.push(<Button className={style.twobutton} type={buttonStates.detail} text="機器を有効化する" onClick={() => { confirmBeforeActivateDeletedDevice() }} key="activate2" />);
        } else if ((brokenFlag == 1) && (deleteFlag == 0)) {//壊れているけど消されていない（修理中など）
            // console.log("壊れているけど消されていない（修理中など）");
            buttons.push(<Button className={style.twobutton} type={buttonStates.detail} text="機器を有効化する" onClick={() => { confirmBeforeActivateBrokenDevice() }} key="activate3" />);
        }
    }


    const backButton = (() => {
        // console.log(Object.keys(searchParams).length > 1);
        if (Object.keys(searchParams).length == 0) {
            return <PageBackButton text="機器一覧へ戻る" href="/devices" />
        } else if (Object.keys(searchParams).length > 1) {
            return <PageBackButton text="機器詳細画面に戻る" href={`/devices/${searchParams.deviceId}`} />
        }
        return <PageBackButton text="戻る" href="/" />
    })()


    // console.log(generateUUID());

    return (
        <form className={style.form}>

            <div className={style.editHeader}>
                {backButton}
                <div className={style.dates}>
                    {searchParams.registrationDate != undefined ? <label>登録日:{formatDate(searchParams.registrationDate)}</label> : null}
                    {searchParams.updateDate != undefined ? <label>更新日{formatDate(searchParams.updateDate)}</label> : null}
                </div>
            </div>

            <div>
                <Selectable className={style.input} label="機器タイプ*"
                    onChange={setDeviceTypeId} options={dtOption} initialValue={deviceTypeId} noValueLabel="機器タイプを選択してください" warning={deviceTypeIdWarning}
                    action={createDeviceType} actionDelete={deviceTypeDeleteButton ? deleteDeviceTypeActionButton : null} actionLabel={"+ 新しい機器タイプを追加"} />
                <Selectable className={style.input} label="メーカー"
                    onChange={setMakerId} options={dmOption} initialValue={makerId} noValueLabel="メーカーを選択してください"
                    action={createDeviceMaker} actionDelete={makerDeleteButton ? deleteMakerActionButton : null} actionLabel={"+ 新しいメーカーを追加"} />
            </div>

            {isComputer ?
                (<div>
                    <BytesInput className={style.input} label="メモリ" onChange={setMemory} initialValue={memory} noValueLabel={""} warning={memoryWarning} />
                    <BytesInput className={style.input} label="容量" onChange={setCapacity} initialValue={capacity} noValueLabel={""} warning={capacityWarning} />
                </div>) : null}
            {isComputer ? <div>
                <Selectable className={style.input} label="OS"
                    onChange={setOsId} options={osOption} initialValue={osId} noValueLabel="OSを選択してください" warning={osIdWarning}
                    action={createOperationSystem} actionDelete={osDeleteButton ? deleteOperationSystemActionButton : null} actionLabel={"+ 新しいOSを追加"} />
                <Selectable className={style.input} label="GPUの有無" onChange={setHasGpu} options={[{ label: "無", value: false }, { label: "有", value: true }]} initialValue={Boolean(hasGpu)} warning={hasGpuWarning} />
            </div> : null}
            <div>
                <DatePicker className={style.input} label="棚卸日" placeholder="棚卸日" onChange={setInventoryDate} initialValue={inventoryDate} max={new Date().toISOString().split('T')[0]} />
                <Selectable className={style.input} label="保管場所*"
                    onChange={setPlaceId} options={spOption} initialValue={placeId} noValueLabel="保管場所を選択してください" warning={placeIdWarning}
                    action={createStoragePlace} actionDelete={storagePlaceDeleteButton ? deleteStoragePlaceActionButton : null} actionLabel={"+ 新しい保管場所を追加"} />
            </div>
            <div>
                <DatePicker className={style.input} label="リース開始日" placeholder="リース開始日" onChange={setLeaseStartDate} initialValue={leaseStartDate} max={new Date().toISOString().split('T')[0]} />
                <DatePicker className={style.input} label="リース期日" placeholder="リース期日" onChange={setLeaseEndDate} initialValue={leaseEndDate} />
            </div>
            <div>

            </div>
            <div>
                <TextArea className={style.textarea} label="備考" placeholder="備考" onChange={setRemarks} initialValue={remarks} />
            </div>

            <div className={style.buttonWrapper}>

                {buttons}
                {Object.keys(searchParams).length > 0 ?
                    <Button className={style.twobutton} type={buttonStates.detail} text="変更を保存する" onClick={() => { validateInputs(editDevice) }} /> :
                    <Button className={style.onebutton} type={buttonStates.positive} text="新規登録" onClick={() => { validateInputs(createDevice) }} />
                }
            </div>
        </form>
    );

}


export default DeviceEdit;