import style from "./style.module.scss";

interface itemType {
    label: string
    data: string
    breakLine?: boolean
    skipOnNull?: boolean
    messageOnNull?: string
}

const PropertyItem = ({ label, data, breakLine = false, skipOnNull = false, messageOnNull = "" }: itemType) => {
    var lineBreakStyle = breakLine ? { display: "block" } : {};
    var noData = (data == "" || data == undefined || data == null);
    var skip = noData && skipOnNull;

    if (skip) return; //skipOnNullかつ、データが存在しない場合はエレメントを返さない

    var dataLabel = noData ?
        <label className={style.nodata} style={lineBreakStyle}>{messageOnNull}</label> :
        <label className={style.data} style={lineBreakStyle}>{data}</label>;

    return (
        <div className={style.propertyItem} style={lineBreakStyle}>
            <label className={style.name} style={lineBreakStyle}>{label}</label>
            {dataLabel}
        </div>
    );

}

export default PropertyItem;