import { useEffect, useState } from "react";
import { get } from "../../utils/webservice";
import ContentForm from "../../components/forms/ContentForm";
import { Content } from "./Content";

export function Feed() {
    const [contents, setContents] = useState([]);
    useEffect(() => {
        get('content')
            .then(res => setContents(res.data))
    }, [])
    return <div className="flex flex-col">
        {contents.map((each, idx) => <Content key={idx} data={each} />)}
    </div>
}