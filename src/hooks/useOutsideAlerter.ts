import { MutableRefObject, useEffect } from 'react';

export const useOutsideAlerter = (
  ref: MutableRefObject<any>,
  onHide: Function
): void => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onHide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onHide]);
};
