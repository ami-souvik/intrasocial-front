import { gql, useQuery } from "@apollo/client";
import { Content, ContentType } from "@/views/content/Content";
import SocketProvider from "@/context/SocketContext";

export const CONTENT_RELATED_COMMENT_LEN = 2
export const CONTENT_RELATED_FEEDBACK_LEN = 10
const CONTENTS_QUERY = gql`
  {
    contents {
      id
    }
  }
`

export function Feed() {
  const { data, loading, error } = useQuery(CONTENTS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return <div className="px-4 h-screen">
    {data.contents.map((each: ContentType, idx: number) =>
      <SocketProvider key={each.id} id={each.id}>
        <Content key={idx} id={each.id} />
      </SocketProvider>)}
  </div>
}