import { useEffect, useState } from "react";
import { TbUserSquareRounded } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { LuHome } from "react-icons/lu";
import { Body, Left, Mid, Right } from "@/components/Body";

export default function FeedTop() {
    const [atTop, isAtTop] = useState(true);
    const [search, setSearch] = useState('');
    useEffect(() => {
        if(window.scrollY == 0) isAtTop(true)
        else isAtTop(false)
    }, [window.scrollY])
    return <Body className={`fixed w-screen top border-b border-slate-700 z-50 backdrop-blur-[5px] ${atTop ? "py-3" : ""}`}>
        <Left />
        <Mid>
            <div className="flex justify-end items-center">
                <input className="p-2 w-full bg-transparent border border-slate-600" placeholder="Search me" value={search}
                onChange={e => setSearch(e.target.value)}></input>
                <button className="flex bg-teal-700 mx-2 space-x-2"
                    onClick={() => window.open('/content/create', '_self')}><CiEdit size={22} /><p>Write</p></button>
                <button className="px-2" onClick={() => window.open('/', '_self')}>
                    <LuHome size={28} />
                </button>
                <button className="px-2" onClick={() => window.open('/profile', '_self')}>
                    <TbUserSquareRounded size={28} />
                </button>
                <button className="px-2">
                    <MdNotificationsNone size={28} />
                </button>
            </div>
        </Mid>
        <Right />
    </Body>
}