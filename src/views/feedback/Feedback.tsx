import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { IoChevronUpCircleOutline, IoChevronDownCircleOutline } from 'react-icons/io5'
import { UserType } from '../user/User'

export type FeedbackType = {
  id: number
  vote: string
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

export type VoteType = 'U' | 'D'

const CREATE_CONTENT_FEEDBACK_MUTATION = gql`
  mutation createFeedback($id: ID!, $what: String!, $vote: String!) {
    createFeedback(id: $id, what: $what, vote: $vote) {
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

export default function Feedback({
  id,
  what = 'content',
  summary: contentSummary,
  data
}: FeedbackFormProps) {
  const [summary, setSummary] = useState(contentSummary)
  const [feedback, setFeedback] = useState<FeedbackType | null>(data)
  const [createFeedback] = useMutation(CREATE_CONTENT_FEEDBACK_MUTATION)
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION)
  function toggleFeedback(vote: VoteType) {
    if (feedback?.vote != vote)
      createFeedback({ variables: { id, what, vote } }).then((res) => {
        setFeedback(res.data?.createFeedback?.feedback)
        setSummary((prev) => {
          const summary = prev
          if (feedback?.vote === 'U') summary.upvoteCount -= 1
          else if (feedback?.vote === 'D') summary.downvoteCount -= 1
          if (vote === 'U') summary.upvoteCount += 1
          else summary.downvoteCount += 1
          return summary
        })
      })
    else
      deleteFeedback({ variables: { id: feedback.id } }).then((res) => {
        setFeedback(null)
        setSummary((prev) => {
          const summary = prev
          if (vote === 'U') summary.upvoteCount -= 1
          else summary.downvoteCount -= 1
          return summary
        })
      })
  }
  return (
    <div className="rounded-lg cursor-pointer">
      <div className="h-full flex flex-1 items-center">
        <div className="flex items-center">
          <div
            className={`flex items-center ${feedback?.vote === 'U' ? 'text-sky-700 rounded-2xl' : ''}`}
          >
            <button onClick={() => toggleFeedback('U')}>
              <IoChevronUpCircleOutline size={20} />
            </button>
          </div>
          <p className="w-8 px-2 text-align-center">
            {summary.upvoteCount - summary.downvoteCount}
          </p>
          <div
            className={`flex items-center ${feedback?.vote === 'D' ? 'text-red-700 rounded-2xl' : ''}`}
          >
            <button onClick={() => toggleFeedback('D')}>
              <IoChevronDownCircleOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
