import { gql, useQuery } from "@apollo/client";
import { Content, ContentType } from "@/views/content/Content";
import SocketProvider from "@/context/SocketContext";

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
      commentCount
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
        upvoteCount
        downvoteCount
        feedback {
          id
          vote
          user {
            firstName
            lastName
            emojiUnicode
          }
        }
        feedbacks {
          id
          vote
          user {
            firstName
            lastName
            emojiUnicode
          }
        }
        comments {
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
          upvoteCount
          downvoteCount
          feedback {
            id
            vote
            user {
              firstName
              lastName
              emojiUnicode
            }
          }
          feedbacks {
            id
            vote
            user {
              firstName
              lastName
              emojiUnicode
            }
          }
          comments {
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
            upvoteCount
            downvoteCount
            feedback {
              id
              vote
              user {
                firstName
                lastName
                emojiUnicode
              }
            }
            feedbacks {
              id
              vote
              user {
                firstName
                lastName
                emojiUnicode
              }
            }
          }
        }
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
    }
  }
`

export function Feed() {
  const { data, loading, error } = useQuery(CONTENTS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  return <div className="px-4 h-screen">
    {data.contents.map((each: ContentType, idx: number) =>
      <SocketProvider>
        <Content key={idx} data={each} />
      </SocketProvider>)}
  </div>
}