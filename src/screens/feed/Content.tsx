import { useEffect, useState } from "react";
import CommentForm from "../../components/forms/CommentForm";
import { get } from "../../utils/webservice";
import Avatar from "../../components/Avatar";
import Comment from "./Comment";

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
    const [comments, setComments] = useState([])
    useEffect(() => {
        get(`comment/${data.id}`)
            .then(res => setComments(res.data))
    }, [])
    return <div className="flex-1 py-4">
        <div className="flex items-center space-x-2">
            <Avatar size="sm" emoji_unicode={data.owner.emoji_unicode} />
            <p className="font-bold">{data.owner.first_name} {data.owner.last_name}</p>
        </div>
        <div className="flex flex-1 flex-col my-2 bg-black rounded-xl p-4">
            <h3 className="text-3xl font-bold">{data.title}</h3>
            <p>{data.body}</p>
        </div>
        <div>
            {comments.map(c =><Comment data={c} />)}
        </div>
        <CommentForm contentId={data.id} />
    </div>
}