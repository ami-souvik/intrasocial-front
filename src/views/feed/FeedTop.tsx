import { useState } from "react";
import { TbUserSquareRounded } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Top } from "@/components/Top";
import { useModal } from "@/context/ModalContext";
import ContentForm from "@/forms/ContentForm";
import Notifications from "@/screens/Notifications";

export default function FeedTop() {
    const { open } = useModal()
    const [search, setSearch] = useState('');
    return <Top>
        <div className="flex justify-end items-center">
            <input className="p-2 w-full bg-neutral-950 border border-slate-600" placeholder="Search me" value={search}
            onChange={e => setSearch(e.target.value)}></input>
            <button className="flex bg-teal-700 mx-2 space-x-2" onClick={() => open(ContentForm, {
                data: {}
            })}><CiEdit size={22} /><p>Write</p></button>
            <button className="px-2" onClick={() => window.open('/profile', '_self')}>
                <TbUserSquareRounded size={28} />
            </button>
            <button className="px-2" onClick={() => open(Notifications, null)}>
                <MdNotificationsNone size={28} />
            </button>
        </div>
    </Top>
}