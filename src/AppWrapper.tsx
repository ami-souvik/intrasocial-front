import ContentFormProvider from "@/context/ContentFormContext";
import LikeListProvider from "./context/LikeListContext";

export default function AppWrapper({ children }: { children: any }) {
  return (
    <ContentFormProvider>
      <LikeListProvider>
        {children}
      </LikeListProvider>
    </ContentFormProvider>
  )
}
