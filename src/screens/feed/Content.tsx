import { useState } from "react";
import Avatar from "../../components/Avatar";
import CommentListView from "../../components/views/CommentListView";

export type Content = {
    id: number,
    owner: {
        emoji_unicode: string,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
    },
    title: string,
    body: string,
    created_at: string,
    updated_at: string
}

export function Content({ data }: { data: Content }) {
    const [showComment, setShowComment] = useState(false);
    return <div className="flex-1 py-4">
        <div className="flex items-center space-x-2">
            <Avatar size="sm" emoji_unicode={data.owner.emoji_unicode} />
            <p className="font-bold">{data.owner.first_name} {data.owner.last_name}</p>
        </div>
        <div className="flex flex-1 flex-col my-2 bg-black rounded-xl p-4">
            <h3 className="text-3xl font-bold">{data.title}</h3>
            <p>{data.body}</p>
        </div>
        {showComment ? <CommentListView contentId={data.id} /> :
        <button className="mb-2" onClick={() => setShowComment(true)}>Comment</button>}
    </div>
}