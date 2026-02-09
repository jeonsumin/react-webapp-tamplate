import {Button, Input, Label, Select, Switch, Checkbox} from "shared/ui";

export const Demo = () => {

    const onClick = () => {
        alert("onClick")
    }
    return (
        <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 w-md self-center space-y-5">
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
            </div>
        </div>
    )
}