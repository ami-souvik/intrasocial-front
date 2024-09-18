export type CommentType = {
    id: number,
    owner: {
        emojiUnicode: string,
        firstName: string,
        lastName: string,
    },
    body: string,
    createdAt?: string,
    updatedAt?: string,
    commentCount: number,
    comments: CommentType[],
    upvoteCount: number,
    downvoteCount: number,
    feedback?: FeedbackType,
    feedbacks: FeedbackType[]
}