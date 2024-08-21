import { useEffect, useState } from "react";
import CommentForm from "../../components/forms/CommentForm";
import { get } from "../../utils/webservice";

export function Content({ data }) {
    const [comments, setComments] = useState([])
    useEffect(() => {
        get(`comment/${data.id}`)
            .then(res => setComments(res.data))
    }, [])
    return <div className="flex-1 py-4">
        <div className="flex flex-1 flex-col justify-center items-center">
            <h3 className="text-3xl font-bold">{data.title}</h3>
            <p>{data.body}</p>
            <p>- {data.owner}</p>
        </div>
        <div>
            {comments.map(c =><p>{c.owner}: {c.body}</p>)}
        </div>
        <CommentForm contentId={data.id} />
    </div>
}