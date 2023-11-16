import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";

interface RegsiterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const initializer: StateCreator<RegsiterModalStore> = (set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
};

const useRegisterModal = create<RegsiterModalStore>(initializer);

export default useRegisterModal;
