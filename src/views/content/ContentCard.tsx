import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go"
import { UserType } from "../user/User"
import Feedback, { FeedbackType } from "../feedback/Feedback"
import { CommentType } from "../comment/Comment"
import Avatar from "@/components/Avatar"
import { formatDate } from "@/utils/datetime"

export type ContentType = {
    id: number,
    owner: UserType,
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    feedback: FeedbackType,
    commentCount: number,
    comments: CommentType[],
    upvoteCount: number,
    downvoteCount: number,
    feedbacks: FeedbackType[]
}

export default function ContentCard({ data }: { data: ContentType}) {
    function handleClick() {
        window.open(`/content/${data.id}`, '_self')
    }
    return <div className="flex-1 py-4 cursor-pointer hover:bg-gray-500/25 rounded-2xl px-2"
        onClick={handleClick}>
        <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
                <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
                <div className="flex items-end py-1">
                    <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
                    <p className="pl-2 text-sm">posted on {formatDate(new Date(data.createdAt))}</p>
                </div>
            </div>
        </div>
        <div className="my-2 border border-slate-600 bg-neutral-900 rounded-xl overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="px-4 py-2 flex justify-between items-center bg-neutral-900">
                    <h3 className="text-xl font-bold text-wrap truncate">{data.title}</h3>
                    <div className="flex space-x-2 items-center">
                        <div className="rounded-lg cursor-pointer">
                            <div className="h-full flex flex-1 items-center">
                                <div className="flex items-center">
                                <div className={`flex items-center ${data.feedback?.vote === "U" ? "text-sky-700 rounded-2xl" : ""}`}>
                                    <button><IoChevronUpCircleOutline size={20} /></button>
                                </div>
                                <p className="w-8 px-2 text-align-center">{data.upvoteCount - data.downvoteCount}</p>
                                <div className={`flex items-center ${data.feedback?.vote === "D" ? "text-red-700 rounded-2xl" : ""}`}>
                                    <button><IoChevronDownCircleOutline size={20} /></button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <GoComment />
                        <p>{data.commentCount}</p>
                    </div>
                </div>
                <div className="border-b border-slate-600"></div>
                <div className='tiptap px-4 py-2 bg-neutral-950' dangerouslySetInnerHTML={{__html: data.body}}></div>
            </div>
        </div>
    </div>
}