import CommentForm from "../../components/forms/CommentForm";

export function Content({ data }) {
    return <div>
        <div className="flex flex-1 flex-col justify-center items-center">
            <h3 className="text-3xl font-bold">{data.title}</h3>
            <p>{data.body}</p>
            <p>- {data.owner}</p>
        </div>
        <CommentForm contentId={data.id} />
    </div>
}