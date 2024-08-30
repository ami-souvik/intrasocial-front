import ModalProvider from "./context/ModalContext";

export default function AppWrapper({ children }: { children: any }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  )
}
