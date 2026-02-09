import {Button, Input, Label, Select, Switch, Checkbox} from "shared/ui";
import {useModal} from "shared/hook";
import {InputField, SelectField, SwitchField} from "shared/ui/form-group-component.tsx";
import {useForm} from "react-hook-form";

export const Demo = () => {

    const {showModal, showAlert} = useModal();

    const {control} = useForm();

    const onClick = () => {
        alert("onClick")
    }

    const openAlert = () => {
        showAlert({
            title: "TITLE",
            message: "MESSAGE"
        })
    }

    const openModal = () => {
        showModal({
            title: "TITLE",
            onClick: () => {
            },
            body: <h1>modal</h1>,
            isLogo: false,
        })
    }
    return (
        <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 w-xl self-center space-y-5">
                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> Label </Label>
                </div>

                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label>Button</Label>
                    <Button onClick={onClick}>Button</Button>
                    <Button variant={"secondary"} onClick={onClick}>Button</Button>
                    <Button variant={"destructive"} onClick={onClick}>Button</Button>
                </div>

                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> Select </Label>
                    <Select options={[
                        {value: "00", label: "00"},
                        {value: "01", label: "01"},
                        {value: "02", label: "02"},
                    ]} placeholder={"전체"}/>
                </div>

                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> Switch </Label>
                    <Switch/>
                </div>
                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> Input </Label>
                    <Input placeholder={"내용을 입력해주세요."}/>
                    <Input error placeholder={"내용을 입력해주세요."}/>
                </div>

                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> checkBox</Label>
                    <Checkbox label={"lable"}/>
                    <Checkbox defaultChecked label={"lable"}/>
                </div>

                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> dialog </Label>
                    <Button onClick={openAlert}>open Alert</Button>
                    <Button onClick={openModal}>open Modal</Button>
                </div>
                <div className="flex flex-col gap-3 bg-gray-100 p-2 rounded-md">
                    <Label> field </Label>
                    <InputField
                        required
                        control={control}
                        name={"username"}
                        label="아이디"
                        placeholder={"아이디를 입력해주세요"}
                    />
                    <InputField
                        required
                        control={control}
                        name={"username"}
                        label="비밀번호 "
                        placeholder={"아이디를 입력해주세요"}
                    />

                    <SelectField
                        horizontal
                        options={[
                            {value: "00", label: "00"},
                            {value: "01", label: "01"},
                            {value: "02", label: "02"},
                        ]}
                        control={control}
                        name={'num'}
                        label={'숫자'}
                    />

                    <SwitchField
                        horizontal
                        control={control}
                        name={"use"}
                        label={"사용 여부"}
                    />

                </div>


            </div>
        </div>
    )
}