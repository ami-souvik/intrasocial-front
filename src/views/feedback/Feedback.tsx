import { useState } from "react";
import { gql, useMutation } from "@apollo/client"
import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from "react-icons/io5";
import { UserType } from "../user/User";
import { useSocket } from "@/context/SocketContext";

export type FeedbackType = {
  id: number,
  vote: string,
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

export type VoteType = "U" | "D"

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
        id
        vote
        user {
          emojiUnicode
          username
          firstName
          lastName
          email
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
  const { isReady, send } = useSocket();
  const [feedback, setFeedback] = useState<FeedbackType | null>(data);
  const [createFeedback] = useMutation(CREATE_CONTENT_FEEDBACK_MUTATION);
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION);
  console.log(summary);
  function toggleFeedback(vote: VoteType) {
    if(feedback?.vote != vote) createFeedback({ variables: { id, what, vote }}).then(res => {
      setFeedback(res.data?.createFeedback?.feedback)
      if(isReady) send(JSON.stringify({
        id,
        type: 'feedback',
        timestamp: Date.now()
      }));
    })
    else deleteFeedback({ variables: { id: feedback.id }}).then(res => {
      setFeedback(null)
      if(isReady) send(JSON.stringify({
        id,
        type: 'feedback',
        timestamp: Date.now()
      }));
    })
  }
  return <div className="rounded-lg cursor-pointer">
      <div className="h-full flex flex-1 items-center">
        <div className="flex items-center">
          <div className={`flex items-center ${feedback?.vote === "U" ? "text-sky-700 rounded-2xl" : ""}`}>
            <button onClick={() => toggleFeedback("U")}><IoChevronUpCircleOutline size={20} /></button>
          </div>
          <p className="w-8 px-2 text-align-center">{summary.upvoteCount - summary.downvoteCount}</p>
          <div className={`flex items-center ${feedback?.vote === "D" ? "text-red-700 rounded-2xl" : ""}`}>
            <button onClick={() => toggleFeedback("D")}><IoChevronDownCircleOutline size={20} /></button>
          </div>
        </div>
      </div>
  </div>
}