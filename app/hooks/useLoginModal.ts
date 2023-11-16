import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const initializer: StateCreator<LoginModalStore> = (set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
};

const useLoginModal = create<LoginModalStore>(initializer);

export default useLoginModal;
