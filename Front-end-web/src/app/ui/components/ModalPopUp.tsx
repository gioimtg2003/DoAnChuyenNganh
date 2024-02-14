import { CloseCircleOutlined } from "@ant-design/icons";

export function ModalPopUp({
  open,
  children,
  onClose,
}: Readonly<{
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}>): JSX.Element {
  return (
    <div
      className={`transition-opacity fixed flex inset-0 justify-center items-center bg-black/15 ${open ? "" : "hidden"} z-50`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="flex flex-row justify-end items-center hover:cursor-pointer"
          onClick={onClose}
        >
          <CloseCircleOutlined />
        </div>

        {children}
      </div>
    </div>
  );
}
