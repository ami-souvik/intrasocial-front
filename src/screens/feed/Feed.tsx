import { gql, useQuery } from "@apollo/client";
import { Content, type Content as ContentType } from "./Content";

export const CONTENT_RELATED_COMMENT_LEN = 2
const CONTENTS_QUERY = gql`
  {
    contents {
      id
      title
      body
      owner {
        id
        username
        firstName
        lastName
        email
        emojiUnicode
      }
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