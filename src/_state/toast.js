import { atom } from 'recoil';

const toastAtom = atom({
   key: 'toast',
   default: null
});

export { toastAtom };