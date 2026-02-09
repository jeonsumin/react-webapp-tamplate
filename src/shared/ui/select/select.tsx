import {forwardRef} from "react";
import clsx from "clsx";
import {SelectProps} from "./select.types.ts";
import {Triangle} from "lucide-react";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({options, placeholder, className, ...props}, ref) => {
        return (
            <div className="flex w-full relative justify-center h-full ">
                <select
                    ref={ref}
                    className={clsx(
                        "bg-white w-full p-4 appearance-none",
                        "border rounded px-3 py-2 bg-white outline-none ",
                        className
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled hidden>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <Triangle className="flex absolute right-3 py-1 self-center rotate-180 " fill={'black'}/>
            </div>
        );
    }
);

Select.displayName = "Select";
