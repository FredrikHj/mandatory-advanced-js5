import {BehaviorSubject} from "rxjs";
const logedIn = false;
const currentPath = '';

export const logedIn$ = new BehaviorSubject(logedIn);
export const localStorage$ = new BehaviorSubject(window.localStorage.getItem('insurtUrlParts'));

export const currentPath$ = new BehaviorSubject(currentPath);

export function updateLocalStorage(accessToken) {
  console.log(accessToken);
  localStorage$.next(accessToken);
}
export function updateLogedIn(logedIn) {  
  logedIn$.next(logedIn);
}
export function updateCurrentPath(currentPath) {
  currentPath$.next(currentPath);
}