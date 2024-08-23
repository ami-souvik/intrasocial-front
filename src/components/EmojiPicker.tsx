import { Controller, type FieldValues, type Control } from "react-hook-form";

const options = ['1f47e', '1f4a9', '1f978', '1faf5', '1f6cc']

type EmojiPickerProps = {
    name: string
    control: Control<FieldValues>;
}

export default function EmojiPicker({ name, control }: EmojiPickerProps) {
    return <Controller
        control={control}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
        return (
            <div>
                {options.map(op =>
                <button className={`${value == op ? 'border-1' : 'border-0'} text-xl border-white`}
                onClick={() => onChange(op)} type="button">{String.fromCodePoint(parseInt(op, 16))}</button>)}
            </div>
        );
        }}
        name={name}
    />
}