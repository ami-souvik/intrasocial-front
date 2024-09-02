import { useState } from "react";
import { gql, useMutation } from "@apollo/client"
import { BsArrowUpSquare } from "react-icons/bs";
import { BsArrowDownSquare } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { UserType } from "../user/User";

export type FeedbackType = {
  id: number,
  user: UserType
}

type FeedbackFormProps = {
  id: number
  what?: 'content' | 'comment'
  summary: {
    upvoteCount: number
    downvoteCount: number
    commentCount: number
  }
  data: FeedbackType
}

export type VoteType = "u" | "d"

const CREATE_CONTENT_FEEDBACK_MUTATION = gql`
  mutation createFeedback(
    $id: ID!
    $what: String!
    $vote: String!) {
    createFeedback(
      id: $id,
      what: $what
      vote: $vote) {
      feedback {
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
const DELETE_FEEDBACK_MUTATION = gql`
  mutation deleteFeedback($id: ID!) {
    deleteFeedback(id: $id) {
      success
    }
  }
`

export default function Feedback({ id, what='content', summary, data }: FeedbackFormProps) {
    const [feedback, setFeedback] = useState(!!data);
    const [createFeedback] = useMutation(CREATE_CONTENT_FEEDBACK_MUTATION);
    const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION);
    function toggleFeedback(vote: VoteType) {
      setFeedback(l => {
        if(!l) createFeedback({ variables: { id, what, vote }}).then(res => {
          return res.data?.createFeedback?.success ? !l : l
        })
        else deleteFeedback({ variables: { id: data.id }}).then(res => {
          return res.data?.deleteFeedback?.success ? !l : l
        })
        return !l
      })
    }
    return <div className="rounded-lg cursor-pointer">
        <div className="h-full flex flex-1 items-center">
          <div className="flex items-center rounded-2xl bg-gray-700 p-0.5">
            <button onClick={() => toggleFeedback("u")}><BsArrowUpSquare size={16} /></button>
            <p>{summary.upvoteCount - summary.downvoteCount}</p>
            <button onClick={() => toggleFeedback("d")}><BsArrowDownSquare size={16} /></button>
          </div>
          <button><GoComment /></button>
          <p>{summary.commentCount}</p>
        </div>
    </div>
}