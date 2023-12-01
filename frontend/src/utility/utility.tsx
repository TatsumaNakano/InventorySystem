import { emailRegex } from "./regex";
import { parseISO } from "date-fns"
// import ja from 'date-fns/local/ja'

export const formatDate = (date: string) => {
    const dateObj = parseISO(date)
    // const dateObj = new Date(Date.parse(date));
    // console.log("dateObj.getDay()", dateObj.getDay());
    return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
}

export const formatDateForJson = (date: Date) => {
    const dateObj = date;
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDay()}`;
}

export const convertMBtoGB = (sizeInMB: number) => {
    return sizeInMB / 1024;
}

export const formatByteSize = (sizeInMB: number) => {

    const units = ["MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = 0;

    while (sizeInMB >= 1024) {
        sizeInMB /= 1024;
        index++;
    }

    const formattedSize = parseFloat(sizeInMB.toFixed(2)) + units[index];
    return formattedSize;
}

export const getAgeByBirthday = (date: string) => {
    const birthday = new Date(Date.parse(date));
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthday.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (currentDate.getMonth() < birthday.getMonth() || (currentDate.getMonth() === birthday.getMonth() && currentDate.getDate() < birthday.getDate())) {
        age--;
    }

    return age;
}

export const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});

export const fetchAndSet = async (apipath: string, func: any) => {
    const query = await fetch(apipath);
    const response = await query.json();
    func(response);
};

export const validateEmail = (email: string) => {
    return (
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(email);
};

export const validateKatakana = (input: string) => {
    return (
        /^[ァ-ヶー　]*$/
    ).test(input);
};

export const validateNameString = (input: string) => {
    return /^[ぁ-んァ-ヶー一-龠]+$/.test(input);
};


export const validateTelNumber = (input: string) => {
    return /^[0-9]+$/.test(input);
};

export const validateUserId = (input: string) => {
    return /^[A-Za-z]\d{4}$/.test(input);
};

export const generateUUID = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export const getJSTDateString = (date: Date) => {

    const options = {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const japanFormattedDate = new Intl.DateTimeFormat('ja-JP', options as any).format(date);

    const formattedString = `(${japanFormattedDate})`;
    return (formattedString);
}

export const getJSTDateTimeString = (date: Date) => {

    const options = {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    const japanFormattedDateTime = new Intl.DateTimeFormat('ja-JP', options as any).format(date);

    const formattedString = `(${japanFormattedDateTime})`;
    return (formattedString);
}


export const emojiToBase64 = (emoji: string) => {
    return Buffer.from(emoji).toString('base64');
}

export const base64ToEmoji = (base64: any) => {
    return Buffer.from(base64, 'base64').toString('utf-8');
}
