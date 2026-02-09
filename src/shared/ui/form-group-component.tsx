import {Controller} from 'react-hook-form';
import {CircleAlert} from 'lucide-react';
import {CSSProperties} from 'react';
import {Input, Label, Select, Switch} from "shared/ui";

interface BaseFormProps {
    control: any;
    name: string;
    label: string;
    rules?: any;
    hint?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    hasBorder?: boolean;
    horizontal?: boolean;
}

interface InputFieldProps extends BaseFormProps {
    type?: string;
    styles?: CSSProperties;
}

const InputField = (props: InputFieldProps) => {
    const {
        control,
        name,
        label,
        hint,
        type = 'text',
        styles = {},
        rules,
        placeholder,
        disabled = false,
        required = false,
        hasBorder = false,
        horizontal = false,
    } = props;
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState: {error}}) => (
                <div className={`${horizontal ? 'flex' : 'grid'}  gap-1 items-center ${hasBorder ? 'border-b' : ''}`}>
                    <Label
                        className={`${horizontal? 'flex-1': 'col-span-1'} ${required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''} `}
                    >
                        {label}
                    </Label>
                    <div className={`${horizontal ? 'flex-5' : 'col-span-1'}`}>
                        <Input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            style={styles}
                            className={` ${error ? 'border-red-500' : ''} w-full`}
                        />
                        {hint && (
                            <Label className="text-gray opacity-70 text-[13px]">
                                <CircleAlert size={14}/>
                                {hint}
                            </Label>
                        )}
                        {error && (
                            <p className="text-sm text-red-500">{error.message}</p>
                        )}

                    </div>
                </div>
            )}
        />
    );
};


interface SelectProps extends BaseFormProps {
    options: any;
}

const SelectField = (props: SelectProps) => {
    const {
        control,
        name,
        label,
        placeholder,
        rules,
        required = false,
        disabled = false,
        hasBorder = false,
        horizontal = false,
        options,
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState: {error}}) => (
                <div className={`${horizontal ? 'flex' : 'grid'} gap-4 items-center ${hasBorder ? 'border-b' : ''}`}>
                    <h3
                        className={`${horizontal ? 'flex-1' : 'grid'} ${required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''}`}
                    >
                        {label}
                    </h3>
                    <div className={`${horizontal ? 'flex-5' : 'col-span-1'}`}>
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={disabled}
                            options={options}
                            placeholder={placeholder}
                        />
                        {error && (
                            <p className="text-sm text-red-500">{error.message}</p>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

interface SwitchProps extends BaseFormProps {
    trueValue?: string;
    falseValue?: string;
}

const SwitchField = (props: SwitchProps) => {
    const {
        control,
        name,
        label,
        rules,
        required = false,
        hasBorder = false,
        horizontal = false,
        trueValue = 'Y',
        falseValue = 'N',

    } = props;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState: {error}}) => (
                <div className={`${horizontal ? 'flex' : 'grid'} gap-4 items-center ${hasBorder ? 'border-b' : ''} `}>
                    <h3
                        className={`${horizontal ? 'flex-1' : 'col-span-1'} ${required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : ''}`}
                    >
                        {label}
                    </h3>
                    <div className={`${horizontal ? 'flex-5' : 'col-span-1'}`}>
                        <Switch
                            id={name}
                            checked={field.value === trueValue}
                            onCheckedChange={(checked) => field.onChange(checked ? trueValue : falseValue)}
                        />
                        {error && (
                            <p className="text-sm text-red-500">{error.message}</p>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export {
    InputField
    , SelectField
    , SwitchField
};