import { gql, useQuery } from "@apollo/client";
import { Content, ContentType } from "@/views/content/Content";

export const CONTENT_RELATED_COMMENT_LEN = 2
export const CONTENT_RELATED_LIKE_LEN = 10
const CONTENTS_QUERY = gql`
  {
    contents {
      id
      title
      body
      liked {
        id
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
      owner {
        id
        username
        firstName
        lastName
        email
        emojiUnicode
      }
      commentsCount
      comments(last: ${CONTENT_RELATED_COMMENT_LEN}) {
        id
        body
        createdAt
        owner {
          emojiUnicode
          username
          firstName
          lastName
          email
        }
      }
      likesCount
      likes(last: ${CONTENT_RELATED_LIKE_LEN}) {
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
      createdAt
    }
  }
`

export function Feed() {
  const { data, loading, error } = useQuery(CONTENTS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return <div className="px-4 h-screen">
    {data.contents.map((each: ContentType, idx: number) =>
      <Content key={idx} data={each} />)}
  </div>
}