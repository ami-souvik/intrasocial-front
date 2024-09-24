import Avatar from "@/components/Avatar";
import { formatDatetime } from "@/utils/datetime";
import { Identity } from "@/views/profile";

export default function CommentIdentity({ owner, createdAt }: { owner: Identity, createdAt: string }) {
    return <div className="flex space-x-2 items-center">
        <div className="w-10 text-center">
            <Avatar size="sm" emojiUnicode={owner.emojiUnicode} />
        </div>
        <div className="flex items-center">
            <p className="text-sm capitalize">{owner.firstName} {owner.lastName}</p>
            <p className="mx-2">.</p>
            <p className="text-sm text-slate-500">{formatDatetime(new Date(createdAt))}</p>
        </div>
    </div>
}