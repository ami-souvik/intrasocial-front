export default function Avatar({ size="lg", emojiUnicode }: { size?: "sm" | "md" | "lg" | "xl", emojiUnicode: string }) {
    const sizemap = {
        "sm": {
            text: "xl"
        },
        "md": {
            text: "2xl"
        },
        "lg": {
            text: "3xl"
        },
        "xl": {
            text: "4xl"
        },
    }
    return emojiUnicode ? <div className="flex w-[36px] justify-center bg-gray-900 rounded-lg mx-1">
        <p className={`py-1 rounded-xl text-center text-${sizemap[size]?.text || '2xl'}`}>{String.fromCodePoint(parseInt(emojiUnicode, 16))}</p>
    </div> : <></>
}