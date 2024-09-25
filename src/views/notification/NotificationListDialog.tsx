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
    return <div ref={logref} className="w-[480px]">
        <div className="flex flex-col p-4 rounded-lg bg-neutral-950">
            <p className="text-3xl font-bold">Notifications</p>
        </div>
    </div>
}