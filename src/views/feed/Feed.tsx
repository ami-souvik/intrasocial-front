import { gql, useQuery } from "@apollo/client";
import { ContentType } from "@/views/content/Content";
import ContentCard from "../content/ContentCard";

export const CONTENT_RELATED_COMMENT_LEN = 2
export const CONTENT_RELATED_FEEDBACK_LEN = 10
const CONTENTS_QUERY = gql`
  {
    contents {
      id
      title
      body
      feedback {
        id
        vote
      }
      owner {
        id
        username
        firstName
        lastName
        email
        emojiUnicode
      }
      upvoteCount
      downvoteCount
      feedbacks(last: ${CONTENT_RELATED_FEEDBACK_LEN}) {
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
      createdAt
      commentCount
    }
  }
`

export function Feed() {
  const { data, loading, error } = useQuery(CONTENTS_QUERY);
  if (loading) return <div className="flex h-screen justify-center items-center">
    <div className="w-[4px] text-slate-400 aspect-square rounded translate-x-[-38px] animate-l21"></div>
  </div>
  if (error) return <pre>{error.message}</pre>
  return <div className="my-2 h-screen space-y-2">
    {data.contents.map((each: ContentType, idx: number) =>
      <ContentCard key={idx} data={each} />)}
  </div>
}