import { emailRegex } from "./regex";

export const formatDate = (date: string) => {
    const dateObj = new Date(Date.parse(date));
    return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDay()}日`;
}

export const formatDateForJson = (date: Date) => {
    const dateObj = date;
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDay()}`;
}

export const convertMBtoGB = (sizeInMB: number) => {
    return sizeInMB / 1000;
}

export const formatByteSize = (sizeInMB: number) => {

    const units = ["MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = 0;

    while (sizeInMB >= 1000) {
        sizeInMB /= 1000;
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

