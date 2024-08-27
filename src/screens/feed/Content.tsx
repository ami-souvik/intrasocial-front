import { useState } from "react";
import Avatar from "../../components/Avatar";
import CommentListView from "../../components/views/CommentListView";
import { type Comment } from "../../components/views/CommentView";
import { formatDatetime } from "../../utils/datetime";

export type Content = {
    id: number,
    owner: {
        emojiUnicode: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
    },
    comments: Comment[]
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    liked: boolean,
}

export function Content({ data }: { data: Content }) {
    const [liked, setLiked] = useState(false);
    return <div className="flex-1 py-4">
        <div className="flex items-center space-x-2">
            <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
            <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
        </div>
        <div className="flex my-2 bg-black rounded-xl px-4 py-2">
            <div className="flex flex-1 flex-col">
                <h3 className="text-3xl font-bold">{data.title}</h3>
                <p>{data.body}</p>
            </div>
            <div className="rounded-lg cursor-pointer" onClick={() => setLiked(l => !l)}>
                <p className={`${liked ? "" : "opacity-50"} text-xl`}>👍</p>
            </div>
        </div>
        <div className="flex justify-end">
            <p className="text-sm self-end">{formatDatetime(new Date(data.createdAt))}</p>
        </div>
        <CommentListView comments={data.comments} contentId={data.id} />
    </div>
}