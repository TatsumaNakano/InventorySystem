import commonStyle from "@/components/styles/commom.module.scss"

const DatePicker = ({ placeholder }: any) => {
    return <input className={commonStyle.input} placeholder={placeholder} type="date"></input>;
}

export default DatePicker;