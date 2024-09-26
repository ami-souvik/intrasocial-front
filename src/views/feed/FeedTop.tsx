import { useState } from "react";
import { TbUserSquareRounded } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdRssFeed } from "react-icons/md";
import { Body, Left, Mid, Right } from "@/components/Body";
import NotificationListDialog from "../notification/NotificationListDialog";

export default function FeedTop() {
    const [search, setSearch] = useState('');
    const [logopen, toggleLog] = useState(false);
    return <Body className="fixed w-screen top border-b border-slate-700 z-50 backdrop-blur-[5px] py-3">
        <Left />
        <Mid>
            <div className="flex justify-end items-center relative">
                <button className="px-2" onClick={() => window.open('/', '_self')}>
                    <MdRssFeed size={28} />
                </button>
                <input className="p-2 w-full bg-transparent border border-slate-600" placeholder="Search me" value={search}
                    onChange={e => setSearch(e.target.value)}></input>
                <button className="flex bg-teal-700 mx-2 space-x-2"
                    onClick={() => window.open('/content/create', '_self')}><CiEdit size={22} /><p>Write</p></button>
                <button className="px-2" onClick={() => window.open('/profile', '_self')}>
                    <TbUserSquareRounded size={28} />
                </button>
                <button className="px-2" onClick={() => toggleLog(true)}>
                    <MdNotificationsNone size={28} />
                </button>
                <div className="absolute top-10 right-0">
                    {logopen && <NotificationListDialog close={() => toggleLog(false)} />}
                </div>
            </div>
        </Mid>
        <Right />
    </Body>
}