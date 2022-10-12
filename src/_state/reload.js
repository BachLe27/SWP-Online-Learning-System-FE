import { atom } from 'recoil';

const reloadAtom = atom({
   key: 'reload',
   default: false
});

export { reloadAtom };