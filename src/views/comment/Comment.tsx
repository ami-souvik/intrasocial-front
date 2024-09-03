import Avatar from "@/components/Avatar"
import { formatDatetime } from "@/utils/datetime"
import CommentList from "./CommentList";
import { FeedbackType } from "../feedback/Feedback";
import Actions from "./Actions";

export type CommentType = {
    id: number,
    owner: {
        emojiUnicode: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
    },
    content: number,
    body: string,
    createdAt: string,
    updatedAt: string,
    comments: CommentType[],
    upvoteCount: number,
    downvoteCount: number,
    commentCount: number,
    feedback: FeedbackType,
    feedbacks: FeedbackType[]
}

export default function Comment({ data }: { data: CommentType }) {
    const socket = new WebSocket('ws://121.0.0.1:8000/ws/chat/feedback');
    socket.onmessage = function(e) {
        console.log(e.data);
    };
    socket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };


    return <div>
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
        <div className="flex my-4">
            <div className="w-6" />
            <div className="w-full">
                {data.comments && <CommentList comments={data.comments} id={data.id} what='comment' />}
            </div>
        </div>
    </div>
}