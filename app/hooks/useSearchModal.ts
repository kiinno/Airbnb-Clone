import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";

interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const initializer: StateCreator<SearchModalStore> = (set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
};

const useSearchModal = create<SearchModalStore>(initializer);

export default useSearchModal;
