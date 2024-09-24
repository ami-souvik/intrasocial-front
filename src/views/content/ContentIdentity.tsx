import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils/datetime";
import { Identity } from "@/views/profile";

export default function ContentIdentity({ owner, createdAt }: { owner: Identity, createdAt: string }) {
    return <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
            <Avatar size="sm" emojiUnicode={owner.emojiUnicode} />
            <div className="flex items-end py-1">
                <p className="font-bold">{owner.firstName} {owner.lastName}</p>
                <p className="pl-2 text-sm">posted on {formatDate(new Date(createdAt))}</p>
            </div>
        </div>
    </div>
}