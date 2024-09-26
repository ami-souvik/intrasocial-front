import { gql, useMutation } from '@apollo/client'
import { GoComment } from 'react-icons/go'
import { CiCircleRemove, CiEdit } from 'react-icons/ci'
import { confirmAction } from '@/utils/popups'
import Feedback from '../feedback/Feedback'

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      success
    }
  }
`

export default function Actions({ data, reply, edit }) {
  const { id, upvoteCount, downvoteCount, commentCount } = data
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION)
  function handleDeleteComment() {
    if (confirmAction({ what: 'comment' })) {
      deleteComment({
        variables: {
          id
        }
      })
    }
  }
  return (
    <div className="flex items-center space-x-2">
      <Feedback
        id={id}
        what="comment"
        summary={{ upvoteCount, downvoteCount, commentCount }}
        data={data.feedback}
      />
      <button onClick={reply}>
        <GoComment />
      </button>
      <p>{data.commentCount || 0}</p>
      <button onClick={edit}>
        <CiEdit size={22} />
      </button>
      <div className="rounded-lg cursor-pointer" onClick={handleDeleteComment}>
        <CiCircleRemove size={20} />
      </div>
    </div>
  )
}
