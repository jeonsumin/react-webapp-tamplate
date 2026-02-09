import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ error, className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={clsx(
                    "border px-3 py-2 rounded outline-none bg-white",
                    error ? "border-red-500" : "border-gray-300",
                    className
                )}
                {...props}
            />
        );
    }
);
