import { Controller } from 'react-hook-form'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

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
        const editor = useEditor({
          extensions,
          content: value || "",
          onUpdate({ editor }) {
            const value = editor.getHTML();
            onChange(value);
          },});
          useEffect(() => {
            if (!editor) return;
            let {from, to} = editor.state.selection;
            editor.commands.setContent(value,
              false,
              {
                preserveWhitespace: "full"
              }
            );
            editor.commands.setTextSelection({from, to});
          }, [editor, value]);
        useImperativeHandle(ref, () => ({
          focus() {
            editor?.commands.focus('end')
          }
        }));
        return <EditorContent editor={editor} />
      }}
      name={name}
    />
  )
})