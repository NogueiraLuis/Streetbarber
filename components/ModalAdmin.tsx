import React from "react";

interface ModalAdminProps {
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export default function ModalAdmin({
  titulo,
  isOpen,
  onClose,
  onSubmit,
  children,
}: ModalAdminProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{titulo}</h2>
        <form className="modal-form" onSubmit={onSubmit}>
          {children}

          <div className="modal-buttons">
            <button type="submit" className="btn-submit">
              Salvar
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}