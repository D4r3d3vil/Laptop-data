import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app, db, oauth } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { bcrypt, bcryptVerify } from "hash-wasm";
import { writable } from "svelte/store";
//userdata store
export const userData = writable({})
export async function register(username, password) {
    if ((await getDoc(doc(db, 'userdata', username))).exists()) return 'user already exists!'
    await setDoc(doc(db, 'userdata', username), { password: (await generate_hash(password)), data: {topscores: [],username: username}})
    return {data:'successful'}
}
export async function signin(username, password) {
    let login = (await getDoc(doc(db, 'userdata', username)))
    let data = login.data()
    if (!login.exists() || !(await checkHash(password, data.password))) return { status: 407, msg: 'Invalid User/Password.' }
    return { status: 203, data: data }
}
export async function password_reset(email) {
  sendPasswordResetEmail(getAuth(app), email)
    .then(() => {
      return { status: 202, data: 'Password reset link sent sucessfully!' }
    })
    .catch((error) => {
      return { status: 501, err: error.message }
    });
}
async function generate_hash(credential) {
  const salt = new Uint8Array(16);
  window.crypto.getRandomValues(salt);
  const key = await bcrypt({ 
    password: credential,
    salt, 
    costFactor: 11,
    outputType: 'encoded',
  });
  return key
}
async function checkHash(credential, hash) {
  const isValid = await bcryptVerify({
    password: credential,
    hash: hash,
  });
  return isValid
}