import Avatar from "../../components/Avatar"

export type Comment = {
    id: number,
    owner: {
        emoji_unicode: string,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
    },
    content: number,
    body: string,
    created_at: string,
    updated_at: string
}

export default function Comment({ data }: { data: Comment }) {
    return <div>
        <div className="flex space-x-2 items-center">
            <Avatar size="sm" emoji_unicode={data.owner.emoji_unicode} />
            <p className="font-bold">{data.owner.first_name} {data.owner.last_name}</p>
        </div>
        <div className="my-2">
            <p>{data.body}</p>
        </div>
    </div>
}