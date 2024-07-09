// src/state/kanbanState.js
import { atom } from "recoil";

// Atom: 보드의 상태를 저장
export const kanbanListState = atom({
  key: "kanbanListState",
  default: [],
});
