import style from "./style.module.scss"

const Loading = ({ message }: any) => {
    console.log(message)
    return (
        <div className={style.loading}>
            {message ? <h1>{message}</h1> : <h1>読み込み中</h1>}
        </div>
    );
}

export default Loading;