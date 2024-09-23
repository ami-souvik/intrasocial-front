import { Controller } from 'react-hook-form'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef, useImperativeHandle } from 'react'

const extensions = [
  Placeholder.configure({
    placeholder: 'Tell us your story ...',
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]



export default forwardRef(({ name, control }, ref) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => {
        const editor = new Editor({
          extensions: extensions,
          autofocus: false,
          content: value,
          // TODO: the editor is not calling update properly, resulting in not able
          // to write anything under editor section
          onUpdate: ({ editor }) => {
            console.log(editor);
            // onChange(editor.getHTML());
          },
        })
        useImperativeHandle(ref, () => ({
          focus() {
            editor?.commands.focus()
          }
        }));
        return <EditorContent editor={editor} />
      }}
      name={name}
    />
  )
})