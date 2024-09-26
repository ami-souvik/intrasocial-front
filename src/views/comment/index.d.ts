import { Identity } from '@/views/profile'

export type CommentType = {
  id: number
  owner: Identity
  body: string
  createdAt: string
  updatedAt: string
  commentCount: number
  comments: CommentType[]
  upvoteCount: number
  downvoteCount: number
  feedback?: FeedbackType
}
