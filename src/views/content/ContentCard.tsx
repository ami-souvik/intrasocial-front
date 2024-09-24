import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go"
import { UserType } from "../user/User"
import { FeedbackType } from "../feedback/Feedback"
import { CommentType } from "@/views/comment"
import ContentIdentity from "./ContentIdentity";

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
    return <div className="flex-1 py-2 cursor-pointer hover:bg-gray-500/25 rounded-2xl px-2"
        onClick={handleClick}>
        <ContentIdentity owner={data.owner} createdAt={data.createdAt} />
        <div className="my-2 border border-slate-600 rounded-xl overflow-hidden">
            <div className="flex flex-1 flex-col py-3 overflow-hidden">
                <div className="px-4 pb-2 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-wrap truncate">{data.title}</h3>
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
                <div className='tiptap px-4' dangerouslySetInnerHTML={{__html: data.body}}></div>
            </div>
        </div>
    </div>
}