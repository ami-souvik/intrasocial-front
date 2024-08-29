import { useState } from "react";
import { gql, useMutation } from "@apollo/client"

const CREATE_CONTENT_LIKE_MUTATION = gql`
  mutation createLike($id: ID!) {
    createLike(content: $id) {
      like {
        content {
          id
          title
          body
        }
        comment {
          id
          body
        }
      }
    }
  }
`
const DELETE_LIKE_MUTATION = gql`
  mutation deleteLike($id: ID!) {
    deleteLike(id: $id) {
      success
    }
  }
`

export default function Like({ contentId, data }: { contentId: number }) {
    const [liked, setLiked] = useState(!!data[0]);
    const [createLike] = useMutation(CREATE_CONTENT_LIKE_MUTATION);
    const [deleteLike] = useMutation(DELETE_LIKE_MUTATION);
    function toggleLike() {
      setLiked(l => {
        if(!l) createLike({ variables: { id: contentId }}).then(res => {
          return res.data?.createLike?.success ? !l : l
        })
        else deleteLike({ variables: { id: data?.[0]?.id }}).then(res => {
          return res.data?.deleteLike?.success ? !l : l
        })
        return !l
      })
    }
    return <div className="rounded-lg cursor-pointer" onClick={toggleLike}>
        <p className={`${liked ? "" : "opacity-50"} text-xl`}>👍</p>
    </div>
}