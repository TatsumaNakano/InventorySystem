import dynamic from "next/dynamic";
import { useState } from "react";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const EmojiPicker = ({ onChange }: any) => {
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const onChangeMod = (emoji: any) => {
        setSelectedEmoji(emoji.emoji)
        onChange(emoji);
    }

    return (
        <>
            <label>{selectedEmoji}</label>
            <Picker onEmojiClick={onChangeMod} />
        </>
    );
}

export default EmojiPicker;