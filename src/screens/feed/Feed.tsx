import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ContentForm from "../../components/forms/ContentForm";
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
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error } = useQuery(CONTENTS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return <div className={`flex flex-col px-4 h-screen ${ showForm && "overflow-hidden"}`}>
    {data.contents.map((each: ContentType, idx: number) =>
      <Content key={idx} data={each} />)}
  </div>
}