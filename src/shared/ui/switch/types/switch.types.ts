import { InputHTMLAttributes } from "react";

export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    checked?: boolean;
}
