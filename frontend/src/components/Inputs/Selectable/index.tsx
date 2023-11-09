"use client"
import Creatable, { useCreatable } from "react-select/creatable"
import commonStyle from "@/components/styles/commom.module.scss"
import style from "./style.module.scss"
import { useEffect, useState } from "react"

//Reference
//https://codesandbox.io/s/j99jxk?module=/example.tsx&file=/example.tsx:97-169

interface Option {
    readonly label: string;
    readonly value: string;
}

const Selectable = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState<Option | null>();
    useEffect(() => {

        const tempOptions = [
            createOption("test1"),
            createOption("test2"),
            createOption("test3"),
        ];

        setOptions(tempOptions as any);

    }, []);

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption] as any);
            setValue(newOption);
        }, 1000);
    };


    return (
        <Creatable
            className={style.selectable}
            options={options} />
    );
}

const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});


export default Selectable;