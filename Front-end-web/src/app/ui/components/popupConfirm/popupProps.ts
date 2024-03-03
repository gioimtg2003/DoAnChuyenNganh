export type props = {
  title: string;
  message: string;
  children: React.ReactNode;
  onConfirm?: (e: any) => void;
  onClose?: () => void;
};
