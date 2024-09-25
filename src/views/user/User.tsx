import Avatar from "@/components/Avatar"

export type UserType = {
    emojiUnicode: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}

export default function User({ data }: { data: UserType }) {
    return <div className="flex items-center mx-4 space-x-4">
        <Avatar size="md" unicode={data.emojiUnicode} />
        <p>{data.firstName} {data.lastName}</p>
    </div>
}