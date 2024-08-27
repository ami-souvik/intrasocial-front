export default function Avatar({ size="lg", emojiUnicode }: { size?: "sm" | "md" | "lg" | "xl", emojiUnicode: string }) {
    const sizemap = {
        "sm": {
            text: "lg"
        },
        "md": {
            text: "xl"
        },
        "lg": {
            text: "2xl"
        },
        "xl": {
            text: "3xl"
        },
    }
    return emojiUnicode ? <div className="flex">
        <p className={`px-1.5 py-1 rounded-xl text-center bg-black text-${sizemap[size]?.text || '2xl'}`}>{String.fromCodePoint(parseInt(emojiUnicode, 16))}</p>
    </div> : <></>
}