import { forwardRef } from "react";
import clsx from "clsx";
import { SwitchProps } from "../types/switch.types.ts";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, checked, ...props }, ref) => {
        return (
            <label className="inline-flex items-center cursor-pointer">
                <input
                    ref={ref}
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    {...props}
                />

                <div
                    className={clsx(
                        "w-11 h-6 bg-gray-200 rounded-full",
                        "peer-checked:bg-primary",
                        "relative transition",
                        "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                        "after:bg-white after:rounded-full",
                        "after:h-5 after:w-5 after:transition-all",
                        "peer-checked:after:translate-x-full",
                        className
                    )}
                />
            </label>
        );
    }
);

Switch.displayName = "Switch";
