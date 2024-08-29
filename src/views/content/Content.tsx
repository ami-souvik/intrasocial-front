import { gql, useMutation } from "@apollo/client";
import Avatar from "@/components/Avatar";
import CommentListView from "@/views/comment/CommentListView";
import { type Comment } from "@/views/comment/CommentView";
import { formatDate } from "@/utils/datetime";
import { confirmAction } from "@/utils/popups";
import { useContentForm } from "@/context/ContentFormContext";
import Like from "@/screens/feed/Like";

export type Content = {
    id: number,
    owner: {
        emojiUnicode: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
    },
    comments: Comment[]
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    liked: boolean,
}

const DELETE_CONTENT_MUTATION = gql`
  mutation deleteContent($id: ID!) {
    deleteContent(id: $id) {
        success
    }
  }
`

export function Content({ data }: { data: Content }) {
    const { openContentFormWith } = useContentForm()
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
        <div className="flex items-center space-x-2">
            <Avatar size="sm" emojiUnicode={data.owner.emojiUnicode} />
            <p className="font-bold">{data.owner.firstName} {data.owner.lastName}</p>
            <p className="pl-2 text-sm">posted on {formatDate(new Date(data.createdAt))}</p>
        </div>
        <div className="my-2 border border-slate-600 bg-neutral-900 rounded-xl overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="px-4 py-2 flex justify-between items-center bg-neutral-900">
                    <h3 className="text-xl font-bold text-wrap truncate">{data.title}</h3>
                    <div className="flex space-x-2">
                        <Like contentId={data.id} data={data.liked} />
                        <div className="rounded-lg cursor-pointer" onClick={() => openContentFormWith(data)}>
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
        <CommentListView comments={data.comments} contentId={data.id} />
    </div>
}