import React from 'react';
import { createPortal } from 'react-dom';

export const ModalScrim = ({ show, onClickScrim, hasColor, children }) => {
  if (!show) {
    return null;
  }

  return createPortal(
    <div
      className="modalScrim"
      onClick={onClickScrim}
      data-hasColor={hasColor ?? true}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById('app')
  );
};
