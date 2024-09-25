import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ContentType } from "@/views/content/Content";
import ContentCard from "../content/ContentCard";
import Loader from "@/components/Loader";

const CONTENT_RECORD_LEN = 5
export const CONTENT_RELATED_COMMENT_LEN = 2
export const CONTENT_RELATED_FEEDBACK_LEN = 10
const CONTENTS_QUERY = gql`
  query getContents($last: Int!, $offset: Int!) {
    contents(last: $last, offset: $offset) {
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
  const { data: _d, loading, error, refetch } = useQuery(CONTENTS_QUERY, {
    variables: {
      last: CONTENT_RECORD_LEN,
      offset: 0,
    }
  });
  const [data, setData] = useState({
    contents: [],
    offset: 0
  });
  function handleScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log(data);
      refetch({
        last: CONTENT_RECORD_LEN,
        offset: data.offset + CONTENT_RECORD_LEN,
      })
    }
  }
  useEffect(() => {
    const app = window.document.getElementById("app")
    app?.addEventListener("scroll", handleScroll)
    return () => {
      app?.removeEventListener("scroll", handleScroll)
    }
  }, [])
  useEffect(() => {
    if(_d?.contents) {
      setData(v => {
        const c = JSON.parse(JSON.stringify(v.contents))
        c.push(..._d.contents)
        return {
          contents: c,
          offset: v.offset + CONTENT_RECORD_LEN,
        }
      })
    }
  }, [_d])
  if (loading) return <div className="flex h-10 justify-center items-center">
    <Loader size='lg' />
  </div>
  if (error) return <pre>{error.message}</pre>
  return <div className="my-2 space-y-1">
    {data.contents.map((each: ContentType, idx: number) =>
      <ContentCard key={idx} data={each} />)}
  </div>
}