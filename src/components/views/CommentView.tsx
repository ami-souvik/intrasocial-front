import Avatar from "../Avatar"

export type Comment = {
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
    updatedAt: string
}

export default function CommentView({ data }: { data: Comment }) {
    return <div>
        <div className="flex space-x-2 items-center">
            <Avatar size="sm" emoji_unicode={data.owner.emojiUnicode} />
            <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
        </div>
        <div className="my-2">
            <p>{data.body}</p>
        </div>
        <div>
            <p>{data.createdAt}</p>
        </div>
    </div>
}