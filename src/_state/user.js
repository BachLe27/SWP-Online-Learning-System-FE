import { atom } from 'recoil';

const userAtom = atom({
   key: 'user',
   // get initial state from local storage to enable user to stay logged in
   default: JSON.parse(localStorage.getItem('user'))
});

const usersAtom = atom({
   key: 'users',
   // get initial state from local storage to enable user to stay logged in
   default: null
});


export { userAtom, usersAtom };