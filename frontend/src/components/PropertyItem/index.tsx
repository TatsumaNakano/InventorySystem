import commonStyle from "@/components/styles/commom.module.scss";
import copy from "clipboard-copy"
import style from "./style.module.scss";
import { messageBubbleState } from "@/utility/recoilStates";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

interface itemType {
    label: string
    data: string
    breakLine?: boolean
    skipOnNull?: boolean
    messageOnNull?: string,
    copyable?: boolean
}

const PropertyItem = ({ label, data, breakLine = false, skipOnNull = false, messageOnNull = "", copyable = false }: itemType) => {


    const [messageBubbleContent, setMessageBubbleContent] = useRecoilState(messageBubbleState);
    const [copyText, setCopyText] = useState(null);
    const ref = useRef<HTMLParagraphElement>(null);

    const lineBreakStyle = breakLine ? { display: "block" } : { whiteSpace: "nowrap" } as any;
    const noData = (data == "" || data == undefined || data == null);
    const skip = noData && skipOnNull;
    const copyableStyle = copyable ? { cursor: "copy" } : {};


    const copyTextOnClick = () => {
        const elm = ref.current as any;
        const text = elm.innerHTML;
        // Use clipboard-copy library to copy text to clipboard
        copy(text)
            .then(() => {
                setMessageBubbleContent(text);
            })
            .catch((err) => {
                console.error('Failed to copy text to clipboard', err);
                // Handle the error, e.g., by notifying the user.
            });
    }

    if (skip) return; //skipOnNullかつ、データが存在しない場合はエレメントを返さない

    // console.log(data)
    var dataLabel = noData ?
        <p className={style.nodata} style={lineBreakStyle}>{messageOnNull}</p> :
        <p className={style.data} style={lineBreakStyle} ref={ref} dangerouslySetInnerHTML={{
            __html: data ? String(data).replace(/\n/g, '<br>') : ""
        }}></p>;

    return (
        <div className={`${style.propertyItem}`} style={Object.assign(lineBreakStyle, copyableStyle)} onClick={copyable ? copyTextOnClick : () => { }} title={copyable ? "コピーするにはクリックしてください" : ""}>
            <label className={style.name} style={lineBreakStyle}>{label}</label>
            {dataLabel}
        </div>
    );

}

export default PropertyItem;