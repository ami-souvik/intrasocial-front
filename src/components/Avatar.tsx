export default function Avatar({ size="lg", unicode }: { size?: "sm" | "md" | "lg" | "xl", unicode: string }) {
    const stylemap = {
        sm: "rounded-md w-[36px] h-[36px] text-xl",
        md: "rounded-lg w-[36px] h-[36px] text-2xl",
        lg: "rounded-xl w-[54px] h-[54px] text-3xl",
        xl: "rounded-2xl w-[36px] h-[36px] text-4xl",
    }
    return <div className={`flex justify-center items-center bg-gray-900 ${stylemap[size] || stylemap.md}`}>
        {unicode ? <p className="py-1 rounded-xl text-center">{String.fromCodePoint(parseInt(unicode, 16))}</p>: <></>}
    </div>
}