import { useEffect, useState } from "react"
import { get } from "../../utils/webservice"
import CommentView, { type Comment } from "./CommentView"
import CommentForm from "../forms/CommentForm"

export default function CommentListView({ contentId: id }: { contentId: number }) {
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        get(`comment/${id}`)
            .then(res => setComments(res.data))
    }, [])
    function onSubmitSuccess(data) {
        setComments(prev => {
            console.log("THIS CALLED TOO");
            const prevcloned = JSON.parse(JSON.stringify(prev))
            prevcloned.push(data)
            return prevcloned
        })
    }
    return <div>
        {comments.map((c, idx) =><CommentView key={idx} data={c} />)}
        <CommentForm contentId={id} onSubmitSuccess={onSubmitSuccess} />
    </div>
}