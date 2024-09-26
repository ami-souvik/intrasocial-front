import { useEffect, useRef } from "react";

export default function NotificationListDialog({ close }) {
    const logref = useRef(null);
    useEffect(() => {
        function clickedOutside(event) {
            if (logref.current && !logref.current.contains(event.target) && close)
                close()
        }
        document.addEventListener("mousedown", clickedOutside);
        return () => {
            document.removeEventListener("mousedown", clickedOutside);
        };
    }, [logref]);
    return <div ref={logref} className="w-[480px] bg-neutral-900 border border-slate-600 rounded-xl p-4 space-y-2">
        <p className="text-3xl font-bold">Notifications</p>
    </div>
}