const COMMENT_SCHEMA = `
  id
  body
  createdAt
  owner {
    emojiUnicode
    firstName
    lastName
  }
  upvoteCount
  downvoteCount
  feedback {
    id
    vote
  }
  feedbacks {
    id
    vote
  }
  commentCount
`
export function getCommentSchema(level: 0 | 1 | 2 | 3 | 4, related: 2 | 10 = 2): string {
  let query: string = `${COMMENT_SCHEMA}`
  for(let i=0;i<level;i++) {
    query += `comments(last: ${related}) {\n${COMMENT_SCHEMA}`
  }
  for(let i=0;i<level;i++) {
    query += '\n}'
  }
  return query
}