import { useEffect, useRef, useState } from 'react'
import { Controller, type FieldValues, type Control } from 'react-hook-form'
import ReactEmojiPicker from 'emoji-picker-react'
import Avatar from './Avatar'

type EmojiPickerProps = {
  name: string
  control: Control<FieldValues>
}

export default function EmojiPicker({ name, control }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerref = useRef(null)
  useEffect(() => {
    function clickedOutside(event) {
      if (pickerref.current && !pickerref.current.contains(event.target) && close)
        setShowPicker(false)
    }
    document.addEventListener('mousedown', clickedOutside)
    return () => {
      document.removeEventListener('mousedown', clickedOutside)
    }
  }, [pickerref])
  return (
    <Controller
      control={control}
      rules={{
        required: true
      }}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <div className="flex relative">
            <div className="cursor-pointer" onClick={() => setShowPicker(true)}>
              <Avatar unicode={value} />
            </div>
            {showPicker && (
              <div ref={pickerref} className="absolute top-14 w-full md:w-auto">
                <ReactEmojiPicker
                  onEmojiClick={({ unified }) => {
                    onChange(unified)
                    setShowPicker(false)
                  }}
                />
              </div>
            )}
          </div>
        )
      }}
      name={name}
    />
  )
}
