import ContentFormProvider from "./context/ContentFormContext";

export default function AppWrapper({ children }: { children: any }) {
  return (
    <ContentFormProvider>
      {children}
    </ContentFormProvider>
  )
}
