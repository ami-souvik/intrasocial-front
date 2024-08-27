import { useState } from "react";
import { Controller, type FieldValues, type Control } from "react-hook-form";
import ReactEmojiPicker from 'emoji-picker-react';

const options = ['1f47e', '1f4a9', '1f978', '1faf5', '1f6cc']

type EmojiPickerProps = {
    name: string
    control: Control<FieldValues>;
}

export default function EmojiPicker({ name, control }: EmojiPickerProps) {
    const [showPicker, setShowPicker] = useState(false);
    return <Controller
        control={control}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
        return (
            <div>
                <button
                    className="text-4xl my-2"
                    onClick={() => setShowPicker(true)}
                    type="button">
                    {String.fromCodePoint(parseInt(value, 16))}
                </button>
                {showPicker && <div className="fixed w-full md:w-auto">
                    <ReactEmojiPicker onEmojiClick={({ unified }) => {
                        onChange(unified)
                        setShowPicker(false)
                    }} />
                </div>}
            </div>
        );
        }}
        name={name}
    />
}