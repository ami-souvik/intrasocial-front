import { gql, useMutation } from "@apollo/client"
import Avatar from "@/components/Avatar"
import { formatDatetime } from "@/utils/datetime"
import { confirmAction } from "@/utils/popups"

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
    updatedAt: string
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
        success
    }
  }
`

export default function Comment({ data }: { data: Comment }) {
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION);
    function handleDeleteComment() {
        if(confirmAction({ what: 'comment' })) {
            deleteComment({
                variables: {
                    id: data.id
                }
            })
        }
    }
    return <div>
        <div className="flex justify-between items-end">
            <div className="flex space-x-2 items-center">
                <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
                <div>
                    <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
                    <p className="text-sm">{formatDatetime(new Date(data.createdAt))}</p>
                </div>
            </div>
            <p className="text-lg cursor-pointer" onClick={handleDeleteComment}>🗑️</p>
        </div>
        <div className="my-2">
            <p>{data.body}</p>
        </div>
    </div>
}