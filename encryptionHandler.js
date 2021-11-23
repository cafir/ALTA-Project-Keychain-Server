import CryptoJS from "crypto-js";
const secret = "12345";

// Encrypt
export const cipherText = (password) => {
    return CryptoJS.AES.encrypt(password, secret).toString();
}
// Decrypt
export const bytes  = (ciphertext) => {
    return CryptoJS.AES.decrypt(ciphertext, secret).toString(CryptoJS.enc.Utf8);
}
