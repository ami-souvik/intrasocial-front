import { AiOutlineClose } from 'react-icons/ai'

export default function Close({ size = 32, onClick }: { size?: number; onClick: () => void }) {
  return (
    <div className="rounded-lg cursor-pointer" onClick={onClick}>
      <AiOutlineClose size={size} />
    </div>
  )
}
