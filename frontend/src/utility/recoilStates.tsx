
import { RecoilState, atom } from "recoil"

interface popupInterface {
    message: string,
    confirmMsg: string,
    cancelMsg: string,
    state: number,
    onConfirm: Function,
    onCancel: Function
}

export const popupState = atom<popupInterface | null>({
    key: "popupState",
    default: null
})

