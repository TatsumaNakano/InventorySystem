export const formatDate = (date: string) => {
    const dateObj = new Date(Date.parse(date));
    return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDay()}日`;
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