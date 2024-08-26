import { gql, useApolloClient } from "@apollo/client"
import Avatar from "../Avatar"
import { formatDatetime } from "../../utils/datetime"
import { confirmAction } from "../../utils/popups"

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

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
        success
    }
  }
`

export default function CommentView({ data }: { data: Comment }) {
    const client = useApolloClient();
    function deleteComment() {
        if(confirmAction({ what: 'comment' })) {
            client.mutate({
                mutation: DELETE_COMMENT_MUTATION,
                variables: {
                    id: data.id
                }
            })
            .then(({ data }) => console.log(data))
        }
    }
    return <div>
        <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
                <Avatar size="sm" emoji_unicode={data.owner.emojiUnicode} />
                <div>
                    <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
                    <p className="text-sm">{formatDatetime(new Date(data.createdAt))}</p>
                </div>
            </div>
            <p className="text-lg cursor-pointer" onClick={deleteComment}>🗑️</p>
        </div>
        <div className="my-2">
            <p>{data.body}</p>
        </div>
    </div>
}