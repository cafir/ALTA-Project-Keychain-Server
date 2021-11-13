import CryptoJS from "crypto-js";
const secret = "12345";

// Encrypt
const ciphertext = (password) => {
    CryptoJS.AES.encrypt(password, secret).toString();
}
// Decrypt
const bytes  = (ciphertext) => {
    CryptoJS.AES.decrypt(ciphertext, secret).toString(CryptoJS.enc.Utf8);
}

