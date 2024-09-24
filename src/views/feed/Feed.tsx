import { gql, useQuery } from "@apollo/client";
import { ContentType } from "@/views/content/Content";
import ContentCard from "../content/ContentCard";
import Loader from "@/components/Loader";

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
    <Loader size='lg' />
  </div>
  if (error) return <pre>{error.message}</pre>
  return <div className="my-2 h-screen pt-[68px] space-y-1">
    {data.contents.map((each: ContentType, idx: number) =>
      <ContentCard key={idx} data={each} />)}
  </div>
}