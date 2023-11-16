import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";

interface RentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const initializer: StateCreator<RentModalStore> = (set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
};

const useRentModal = create<RentModalStore>(initializer);

export default useRentModal;
