
import { RecoilState, atom } from "recoil"

interface popupInterface {
    message: string,
    confirmMsg: string,
    cancelMsg: string,
    state: number,
    onConfirm: Function,
    onCancel: Function,
    onChange?: Function,
    labelText?: string,
    placeholder?: string,
    selectedValue?: string
    // validInput?: boolean
}

export const popupState = atom<popupInterface | null>({
    key: "popupState",
    default: null
})

export const messageBubbleState = atom({
    key: "messageBubbleState",
    default: null
})

