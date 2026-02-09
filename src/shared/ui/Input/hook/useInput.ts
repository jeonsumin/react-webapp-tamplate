import { useState } from "react";

export const useInput = (defaultValue = "") => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange,
    };
};
