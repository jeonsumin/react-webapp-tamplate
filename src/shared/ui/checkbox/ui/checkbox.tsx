import {forwardRef} from "react";
import clsx from "clsx";
import {CheckboxProps} from "../types/checkbox.types";
import {Check} from 'lucide-react';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({label, className, disabled, ...props}, ref) => {
        return (
            <label
                className={clsx(
                    "inline-flex items-center gap-2 cursor-pointer select-none",
                    disabled && "cursor-not-allowed opacity-60"
                )}
            >
                <input
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    className="peer sr-only"
                    {...props}
                />

                {/* 체크 박스 UI */}
                <span
                    className={clsx(
                        "w-4 h-4 border rounded flex items-center justify-center",
                        "border-gray-400 bg-white",
                        "peer-checked:bg-primary peer-checked:border-primary",
                        className
                    )}
                >
          {/* 체크 아이콘 */}
          {/*          <Check/>*/}
                    <svg
                        className="w-3 h-3 text-white  peer-checked:block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>

                {label && <span className="text-sm">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";
