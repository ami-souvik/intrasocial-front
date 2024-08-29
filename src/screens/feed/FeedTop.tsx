import { CiMenuBurger } from "react-icons/ci";
import { Top } from "@/components/Top";
import { useContentForm } from "@/context/ContentFormContext";

export default function FeedTop() {
    const { openContentForm } = useContentForm()
    return <Top>
        <div className="flex justify-between items-center">
            <button className="px-4">
                <CiMenuBurger size={28} />
            </button>
            <button className="bg-teal-700 rounded-2xl" onClick={openContentForm}>📝 Write</button>
        </div>
    </Top>
}