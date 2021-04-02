import React from 'react';
import { createPortal } from 'react-dom';

export const ModalScrim = ({ show, onClickScrim, children }) => {
  if (!show) {
    return null;
  }

  return createPortal(
    <div className="modalScrim" onClick={onClickScrim}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById('app')
  );
};
