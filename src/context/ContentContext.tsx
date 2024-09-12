import { createContext, useContext, useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useSearchParams } from "react-router-dom";
import { ContentType } from "@/views/content/Content";
import { CommentType } from "@/views/comment/Comment";

type ContentProps = {
    data: ContentType,
    setSearchParams: (v: { [key: string]: string }) => void
}

const ContentContext = createContext<ContentProps>({});

export const CONTENT_RELATED_COMMENT_LEN = 2
export const CONTENT_RELATED_FEEDBACK_LEN = 10
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
    vote
  }
  feedbacks {
    id
    vote
  }
  commentCount
`
const CONTENT_QUERY = gql`
  query getContent($content: ID!, $comment: ID! = -1){
    contents(content: $content) {
      id
      title
      body
      feedback {
        id
        vote
        user {
          firstName
          lastName
          emojiUnicode
        }
      }
      owner {
        firstName
        lastName
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
      comments(comment: $comment, last: ${CONTENT_RELATED_COMMENT_LEN}) {
        ${COMMENT_SCHEMA}
        comments(last: ${CONTENT_RELATED_COMMENT_LEN}) {
          ${COMMENT_SCHEMA}
          comments(last: ${CONTENT_RELATED_COMMENT_LEN}) {
            ${COMMENT_SCHEMA}
            comments(last: ${CONTENT_RELATED_COMMENT_LEN}) {
              ${COMMENT_SCHEMA}
              comments(last: ${CONTENT_RELATED_COMMENT_LEN}) {
                ${COMMENT_SCHEMA}
              }
            }
          }
        }
      }
    }
  }
`

function hashcomments(comments: CommentType[], map={}): { [key: number]: any } {
  comments?.forEach(c => {
    map[c.id] = { ...c, comments: null }
    if(c.comments) {
      map = hashcomments(c.comments, map)
    }
  })
  return map
}

export default function ContentProvider({ children }:
    { children: any }) {
    const { content } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: raw, loading, error } = useQuery(CONTENT_QUERY, { variables: { content, comment: searchParams.get("id") || -1 } });
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    const data = raw.contents[0]
    const hashed = {...data, comments: null}
    hashed.comments = hashcomments(data.comments)
    return <ContentContext.Provider value={{ data, hashed, setSearchParams }}>
      {children}
    </ContentContext.Provider>
}

export function useContent() {
    return useContext(ContentContext)
}