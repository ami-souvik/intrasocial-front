export default function Avatar({ size, emoji_unicode }: { size: "sm" | "md" | "lg" | "xl", emoji_unicode: string }) {
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
    return emoji_unicode ? <div className="flex">
        <p className={`px-1.5 py-1 rounded-xl text-center bg-black text-${sizemap[size]?.text || '2xl'}`}>{String.fromCodePoint(parseInt(emoji_unicode, 16))}</p>
    </div> : <></>
}