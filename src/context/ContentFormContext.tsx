import { createContext, useContext, useState } from "react";
import ContentForm from "@/forms/ContentForm";
import { ContentType } from "@/views/content/Content";

export type ContentFormType = {
    isContentFormOpen: boolean,
    openContentForm: () => void,
    openContentFormWith: (v: ContentType) => void,
    closeContentForm: () => void
}

export const ContentFormContext = createContext<ContentFormType>({
    isContentFormOpen: false,
    openContentForm: () => {},
    openContentFormWith: (v) => {},
    closeContentForm: () => {}
});

export default function ContentFormProvider({ children }: { children: any }) {
    const [data, setData] = useState<ContentType | null>(null);
    const [isContentFormOpen, setContentForm] = useState(false);
    function openContentForm() {
        setData(null)
        setContentForm(true);
    }
    function openContentFormWith(v: ContentType) {
        if(v) setData(v)
        setContentForm(true);
    }
    function closeContentForm() {
        setContentForm(false);
    }

    return (
        <ContentFormContext.Provider value={{ isContentFormOpen, openContentForm, openContentFormWith, closeContentForm }}>
            {isContentFormOpen && <ContentForm {...{ data, closeContentForm }} />}
            <div className={`${isContentFormOpen ? "overflow-hidden" : ""}`}>
                {children}
            </div>
        </ContentFormContext.Provider>
    );
}

export const useContentForm = () => useContext(ContentFormContext);
