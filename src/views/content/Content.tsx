import { gql, useMutation } from "@apollo/client";
import Avatar from "@/components/Avatar";
import CommentList from "@/views/comment/CommentList";
import { CommentType } from "@/views/comment/Comment";
import { UserType } from "@/views/user/User";
import { formatDate } from "@/utils/datetime";
import { confirmAction } from "@/utils/popups";
import Like, { LikeType } from "@/views/like/Like";
import { useModal } from "@/context/ModalContext";
import ContentForm from "@/forms/ContentForm";
import LikeList from "@/views/like/LikeList";

export type ContentType = {
    id: number,
    owner: UserType,
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    liked: LikeType[],
    commentsCount: number,
    comments: CommentType[],
    likesCount: number,
    likes: LikeType[]
}

const DELETE_CONTENT_MUTATION = gql`
  mutation deleteContent($id: ID!) {
    deleteContent(id: $id) {
        success
    }
  }
`

export function Content({ data }: { data: ContentType }) {
    const { open } = useModal()
    const [deleteContent] = useMutation(DELETE_CONTENT_MUTATION);
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
            <div className="flex items-end space-x-2 py-1">
                <p className="cursor-pointer" onClick={() => {
                    if(data.likesCount > 0) open(LikeList, { data: data.id })
                }}>{data.likesCount} like(s)</p>
                <p>{data.commentsCount} comment(s)</p>
            </div>
        </div>
        <div className="my-2 border border-slate-600 bg-neutral-900 rounded-xl overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="px-4 py-2 flex justify-between items-center bg-neutral-900">
                    <h3 className="text-xl font-bold text-wrap truncate">{data.title}</h3>
                    <div className="flex space-x-2">
                        <Like contentId={data.id} data={data.liked} />
                        <div className="rounded-lg cursor-pointer" onClick={() => open(ContentForm, {
                            modalClassName: 'h-full',
                            data
                        })}>
                            <p className="text-xl">📝</p>
                        </div>
                        <div className="rounded-lg cursor-pointer" onClick={handleDeleteContent}>
                            <p className="text-xl">❌</p>
                        </div>
                    </div>
                </div>
                <div className="border-b border-slate-600"></div>
                <div className='tiptap px-4 py-2 bg-neutral-950' dangerouslySetInnerHTML={{__html: data.body}}></div>
            </div>
        </div>
        <CommentList comments={data.comments} contentId={data.id} />
    </div>
}