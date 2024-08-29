import { AiOutlineClose } from "react-icons/ai";

export default function Close({ onClick }: { onClick: () => void }) {
    return <div className="rounded-lg cursor-pointer" onClick={onClick}>
      <AiOutlineClose size={32} />
    </div>
}