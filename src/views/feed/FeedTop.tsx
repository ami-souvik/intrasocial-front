import { TbUserSquareRounded } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { Top } from "@/components/Top";
import { useModal } from "@/context/ModalContext";
import ContentForm from "@/forms/ContentForm";
import Profile from "@/views/profile/Profile";

export default function FeedTop() {
    const { open } = useModal()
    return <Top>
        <div className="flex justify-end items-center">
            <button className="bg-teal-700 mx-2" onClick={() => open(ContentForm, {
                modalClassName: 'h-full',
                data: null
            })}>📝 Write</button>
            <button className="px-2" onClick={() => open(Profile, null)}>
                <TbUserSquareRounded size={28} />
            </button>
            <button className="px-2" onClick={() => open(Profile, null)}>
                <MdNotificationsNone size={28} />
            </button>
        </div>
    </Top>
}