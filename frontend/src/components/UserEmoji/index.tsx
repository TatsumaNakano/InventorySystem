const UserEmoji = ({ type }: any) => {

    const emoji = (() => {

        switch (type) {
            case 1:
                return <>👨‍🦰</>;
            case 2:
                return <>👩</>;

        }
    })()
    return emoji;
}

export default UserEmoji;