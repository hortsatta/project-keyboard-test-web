export type CoreSlice = {
  isMinimalUI: boolean;
  openMainMenu: boolean;
  setMinimalUI: (isMinimalUI: boolean) => void;
  setOpenMainMenu: (open?: boolean) => void;
};
