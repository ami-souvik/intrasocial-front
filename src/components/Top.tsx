import { Body, Left, Mid, Right } from "./Body";

export function Top({ children }: { children: any }) {
    return (
        <Body className="border-b border-slate-700 py-3">
            <Left />
            <Mid>{children}</Mid>
            <Right />
        </Body>
    )
}