import { SelectHTMLAttributes } from "react";

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    placeholder?: string;
    onValueChange?: () => void;
}
