import { createPortal } from "react-dom";
import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

export default function Modal({
  children,
  actionBar,
  onClose
}: {
  children: React.ReactNode;
  actionBar: React.ReactNode;
  onClose: () => void;
}) {
  const modalContainer = document.querySelector(".modal-container");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return modalContainer
    ? createPortal(
        <div className="flex items-center justify-center fixed inset-0">
          <div onClick={onClose} className="absolute inset-0 bg-slate-950 opacity-80"></div>
          <div className="bg-white p-4 w-11/12 rounded-lg z-10">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-end w-full">
                <IconX onClick={onClose} />
              </div>
              { children }
              <div className="flex justify-end">
                { actionBar }
              </div>
            </div>
          </div>
        </div>,
        modalContainer
      )
    : null;
}
