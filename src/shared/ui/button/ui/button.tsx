import {ButtonProps} from "../types/button.types";
import clsx from "clsx";

const variantStyle: any = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-muted text-muted-foreground",
};

export const Button = ({
                           variant = "primary",
                           isLoading,
                           className,
                           children,
                           ...props
                       }: ButtonProps) => {
    return (
        <button
            className={clsx(
                "px-4 py-2 rounded font-medium transition",
                variantStyle[variant],
                className
            )}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
};
