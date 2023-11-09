const DeviceEmoji = ({ type }: any) => {

    const emoji = (() => {
        switch (type) {
            case 1:
                return <>🖥️</>;
            case 2:
                return <>💻</>;
            case 3:
                return <>🖱️</>;
            case 4:
                return <>⌨️</>;
            case 5:
                return <>🖥️</>;
            case 6:
                return <>🥽</>;
            case 7:
                return <>🎤</>;
            case 8:
                return <>✍🏻</>;
            case 9:
                return <>📱</>;
            case 10:
                return <>📱</>;
        }
    })()
    return emoji;
}

export default DeviceEmoji;