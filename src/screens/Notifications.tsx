import Close from "@/components/Close";

export default function Notifications({ close }) {
    return <div className="w-full max-w-[480px]">
        <div className="flex justify-end">
            <Close onClick={close} />
        </div>
        <div className="flex flex-col p-4 rounded-lg border border-slate-600 bg-neutral-950">
            <p className="text-3xl font-bold">Notifications</p>
        </div>
    </div>
}