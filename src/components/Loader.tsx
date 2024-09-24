export default function Loader({ size='sm' }: { size?: 'lg' | 'sm' }) {
    if(size === 'lg') return <div className="w-[57px]">
        <div className="w-[4px] text-slate-400 aspect-square rounded translate-x-[-38px] animate-l21"></div>
    </div>
    else return <div className="w-[32px]">
        <div className="w-[1px] text-slate-400 aspect-square rounded translate-x-[-16px] animate-l21sm"/>
    </div>
}