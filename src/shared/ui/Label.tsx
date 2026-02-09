import { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ children, ...props }: Props) => {
    return (
        <label className="text-sm font-medium" {...props}>
            {children}
        </label>
    );
};
