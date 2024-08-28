import { createContext, useContext, useState } from "react";
import ContentForm from "../components/forms/ContentForm";

const ContentFormContext = createContext({});

export default function ContentFormProvider({ children }: { children: any }) {
    const [data, setData] = useState(null);
    const [isContentFormOpen, setContentForm] = useState(false);
    function openContentForm() {
        setData(null)
        setContentForm(true);
    }
    function openContentFormWith(v) {
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
