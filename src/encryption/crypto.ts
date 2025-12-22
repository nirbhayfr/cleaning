import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET as string;

export const encryptData = (data: unknown): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = <T>(cipherText: string): T => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
};
