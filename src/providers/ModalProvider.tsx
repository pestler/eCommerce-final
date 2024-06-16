import {createContext, ReactNode, useState} from 'react';
import {ModalType} from "../interface/modal.type.ts";
import Modal from "../components/modal/Modal.tsx";

export interface IModalContext {
    openModal: (payload: ModalType) => void,
    closeModal: () => void,
}

interface Props {
    children: ReactNode;
}

export const ModalContext = createContext<IModalContext | undefined>(
    undefined,
);

export const ModalProvider = ({children}: Props) => {

    const [modal, setModal] = useState<ModalType | null>(null);

    const openModal = (payload: ModalType) => {
        setModal(payload);
    }

    const closeModal = () => {
        setModal(null);
    }

    return (
        <ModalContext.Provider value={{openModal, closeModal}}>
            {modal &&
                <Modal
                    open={modal.open}
                    handleClose={modal.handleClose}
                    title={modal.title}
                    description={modal.description}
                ></Modal>
            }
            {children}
        </ModalContext.Provider>
    );
};
