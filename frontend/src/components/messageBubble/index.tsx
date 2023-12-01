import { useRecoilState } from "recoil";
import style from "./style.module.scss"
import { useEffect, useRef, useState } from "react";
import { messageBubbleState } from "@/utility/recoilStates";

//https://www.codingbeautydev.com/blog/react-get-mouse-position

interface mousePos {
    x: Number,
    y: Number
}
const MessageBubble = () => {
    const [fadeStyle, setFadeStyle] = useState(style.fadeOut);
    const [messageBubbleContent, setMessageBubbleContent] = useRecoilState(messageBubbleState);
    const [mousePos, setMousePos] = useState<mousePos>({ x: 0, y: 0 });
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event: any) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    useEffect(() => {
        if (messageBubbleContent) {
            setFadeStyle(style.fadeIn);
            setTimeout(() => {
                setFadeStyle(style.fadeOut);
            }, 1000)
        }
    }, [messageBubbleContent])

    const scroll = {
        x: typeof (window) != 'undefined' ? window.scrollX : 0,
        y: typeof (window) != 'undefined' ? window.scrollY : 0,
    }

    const elm = ref.current as any;
    const pos = mousePos as any;
    const positionStyle = { left: pos.x - (elm?.offsetWidth / 2) + scroll.x + "px", top: pos.y - (elm?.offsetHeight / 2) + scroll.y - 30 + "px" };

    return (
        <div className={`${style.messageBubble} ${fadeStyle}`} style={positionStyle} ref={ref}>
            <label>{messageBubbleContent}</label>
            <label>クリップボードにコピーしました！</label>
        </div>
    );
}

export default MessageBubble;