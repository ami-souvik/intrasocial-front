import { IoIosAddCircleOutline } from "react-icons/io";
import Avatar from "@/components/Avatar"
import { formatDatetime } from "@/utils/datetime"
import CommentList from "./CommentList";
import { useContent } from "@/context/ContentContext";
import { FeedbackType } from "../feedback/Feedback";
import Actions from "./Actions";

export type CommentType = {
    id: number,
    owner: {
        emojiUnicode: string,
        firstName: string,
        lastName: string,
    },
    content: number,
    body: string,
    createdAt: string,
    updatedAt: string,
    commentCount: number,
    comments: CommentType[],
    upvoteCount: number,
    downvoteCount: number,
    feedback: FeedbackType,
    feedbacks: FeedbackType[]
}

export default function Comment({ data }: { data: CommentType }) {
    const { setSearchParams } = useContent();
    return <div>
        <div className="flex relative">
            <div className={`w-[12px] absolute top-[30px] left-[18px] border-l border-slate-800
                ${ data.commentCount > 0 ? "h-[95px] border-b rounded-bl-2xl" : "h-[99px]"}`} />
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2 items-center">
                        <div className="w-10 text-center">
                            <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
                        </div>
                        <div className="flex items-center">
                            <p className="text-sm">{data.owner.firstName} {data.owner.lastName}</p>
                            <p className="mx-2">.</p>
                            <p className="text-sm text-slate-500">{formatDatetime(new Date(data.createdAt))}</p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-10" />
                    <p className="ml-2 text-sm">{data.body}</p>
                </div>
                <div className="flex my-1">
                    <div className="w-8" />
                    <Actions data={data} />
                </div>
            </div>
        </div>
        {
            data.commentCount > 0 && (!data.comments || data.comments.length === 0) ?
            <div className="flex my-4 translate-y-[7px]">
                <div className="w-6" />
                <div className="w-full">
                    <a className="flex items-center cursor-pointer text-slate-500 space-x-2 mx-2"
                    onClick={() => setSearchParams({ id: data.id })}>
                        <IoIosAddCircleOutline size={22} />
                        <p>Show More...</p>
                    </a>
                </div>
            </div> :
            <div className="flex my-4">
                <div className="w-6" />
                <div className="w-full">
                    {data.comments && <CommentList id={data.id} count={data.commentCount} comments={data.comments} what='comment' />}
                </div>
            </div>
        }
    </div>
}