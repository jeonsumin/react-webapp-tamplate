import {InputHTMLAttributes} from "react";

export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    onCheckedChange?: (value: any) => void;
    checked?: boolean;
}
