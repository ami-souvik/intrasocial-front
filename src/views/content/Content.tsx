import { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import Avatar from "@/components/Avatar";
import CommentList from "@/views/comment/CommentList";
import { CommentType } from "@/views/comment/Comment";
import { UserType } from "@/views/user/User";
import { formatDate } from "@/utils/datetime";
import { confirmAction } from "@/utils/popups";
import Feedback, { FeedbackType } from "@/views/feedback/Feedback";
import { useModal } from "@/context/ModalContext";
import SocketProvider, { useSocket } from "@/context/SocketContext";
import ContentForm from "@/forms/ContentForm";
import CommentForm from "@/forms/CommentForm";

export type ContentType = {
    id: number,
    owner: UserType,
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    feedback: FeedbackType,
    commentCount: number,
    comments: CommentType[],
    upvoteCount: number,
    downvoteCount: number,
    feedbacks: FeedbackType[]
}

export const CONTENT_RELATED_COMMENT_LEN = 2
export const CONTENT_RELATED_FEEDBACK_LEN = 10
const CONTENT_QUERY = gql`
  query getContent($contentId: ID!){
    contents(contentId: $contentId) {
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
          }
        }
      }
    }
  }
`
const DELETE_CONTENT_MUTATION = gql`
  mutation deleteContent($id: ID!) {
    deleteContent(id: $id) {
      success
    }
  }
`

function Content({ id: contentId }: { id: number }) {
    const { open } = useModal()
    const { event } = useSocket();
    const { data: contentData, loading, error, refetch } = useQuery(CONTENT_QUERY, { variables: {contentId} });
    useEffect(() => {
        refetch()
    }, [event])
    const [deleteContent] = useMutation(DELETE_CONTENT_MUTATION);
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    const data = contentData.contents[0]
    function handleDeleteContent() {
      if(confirmAction({ what: 'comment' })) {
        deleteContent({
          variables: {
            id: data.id
          }
        })
      }
    }
    return <div className="flex-1 py-4">
      <div className="flex justify-between">
          <div className="flex space-x-2">
              <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
              <div className="flex items-end py-1">
                  <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
                  <p className="pl-2 text-sm">posted on {formatDate(new Date(data.createdAt))}</p>
              </div>
          </div>
      </div>
      <div className="my-2 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
              <div className="px-4 py-2 flex justify-between items-center">
                  <h3 className="text-4xl font-bold text-wrap truncate">{data.title}</h3>
                  <div className="flex space-x-2 items-center">
                      <Feedback
                          id={data.id}
                          summary={{
                              upvoteCount: data.upvoteCount,
                              downvoteCount: data.downvoteCount,
                              commentCount: data.commentCount
                          }}
                          data={data.feedback}
                      />
                      <button onClick={() => open(CommentForm, {
                        data: {
                          id: data.id,
                          what: 'content'
                        }
                      })}><GoComment /></button>
                      <button onClick={() => open(ContentForm, {
                        modalClassName: 'h-full',
                        data
                      })}><CiEdit size={22} /></button>
                      <div className="rounded-lg cursor-pointer" onClick={handleDeleteContent}>
                          <CiCircleRemove size={20} />
                      </div>
                  </div>
              </div>
              <div className='tiptap px-4 py-2 bg-neutral-950' dangerouslySetInnerHTML={{__html: data.body}}></div>
          </div>
      </div>
      <CommentList comments={data.comments} id={data.id} what="comment" />
  </div>
}

export default () => {
  const { contentId } = useParams();
  return <SocketProvider id={contentId}>
    <Content id={contentId} />
  </SocketProvider>
}