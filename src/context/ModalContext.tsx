import Modalize from "@/modals/Modalize";
import React, { createContext, useContext, useState } from "react";

export type ModalType = {
    isOpen: boolean,
    open: (component: React.Component, options: any) => void,
    close: () => void
}

export const ModalContext = createContext<ModalType>({
    isOpen: false,
    open: () => {},
    close: () => {}
});

type StateType = {
    component: React.Component,
    modalClassName: string,
    data: any,
}

export default function ModalProvider({ children }: { children: any }) {
    const [state, setState] = useState<StateType>();
    const [isOpen, setIsOpen] = useState(false);
    function open(component: React.Component, options: any) {
        setState({ component, ...options })
        setIsOpen(true);
    }
    function close() {
        setState(undefined);
        setIsOpen(false);
    }
    return (
        <ModalContext.Provider value={{ isOpen, open, close }}>
            {isOpen && state && <Modalize
                component={state.component}
                modalClassName={state.modalClassName}
                componentProps={{ data: state.data, close }}
            />}
            <div className={`${isOpen ? "overflow-hidden" : ""}`}>
                {children}
            </div>
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);