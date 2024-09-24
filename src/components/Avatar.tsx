export default function Avatar({ size="lg", emojiUnicode }: { size?: "sm" | "md" | "lg" | "xl", emojiUnicode: string }) {
    const sizemap = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
    }
    return <div className="flex w-[36px] h-[36px] justify-center bg-gray-900 rounded-lg mx-1">
        {emojiUnicode ? <p className={`py-1 rounded-xl text-center ${sizemap[size] || sizemap.md}`}>{String.fromCodePoint(parseInt(emojiUnicode, 16))}</p>: <></>}
    </div>
}