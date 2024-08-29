import { createContext, useContext, useState } from "react";
import LikeList from "@/views/like/LikeList";

export type LikeListType = {
    isLikeListOpen: boolean,
    openLikeList: (id: number) => void,
    closeLikeList: () => void
}

export const LikeListContext = createContext<LikeListType>({
    isLikeListOpen: false,
    openLikeList: (id) => {},
    closeLikeList: () => {}
});

export default function LikeListProvider({ children }: { children: any }) {
    const [id, setId] = useState<number>();
    const [isLikeListOpen, setLikeList] = useState(false);
    function openLikeList(id: number) {
        setId(id)
        setLikeList(true);
    }
    function closeLikeList() {
        setId(undefined);
        setLikeList(false);
    }
    return (
        <LikeListContext.Provider value={{ isLikeListOpen, openLikeList, closeLikeList }}>
            {isLikeListOpen && id && <LikeList {...{ id, closeLikeList }} />}
            <div className={`${isLikeListOpen ? "overflow-hidden" : ""}`}>
                {children}
            </div>
        </LikeListContext.Provider>
    );
}

export const useLikeList = () => useContext(LikeListContext);
