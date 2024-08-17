import { atom } from "recoil";

export const titleState = atom({
    key: 'titleState',
    default : '',
});

export const contentState = atom({
    key: 'contentState',
    default : ''
});