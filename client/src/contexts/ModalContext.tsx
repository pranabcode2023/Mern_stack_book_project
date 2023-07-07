import React, { createContext, useState, ReactNode } from "react";

export interface ModalContextInterface {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalContent: string | null;
  modalContent2: ReactNode | null;
  setModalContent: (content: string | null) => void;
  setModalContent2: (content: ReactNode | null) => void;
}

export const ModalContext = createContext<ModalContextInterface>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalContent: "",
  modalContent2: null,
  setModalContent: () => {},
  setModalContent2: () => {},
});

interface ModalContextProviderProps {
  children: ReactNode;
}
