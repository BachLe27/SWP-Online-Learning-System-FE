import { atom } from 'recoil';

const addAtom = atom({
   key: 'add',
   default: false
});

export { addAtom };