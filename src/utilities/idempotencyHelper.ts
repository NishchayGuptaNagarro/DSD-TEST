import CryptoJS from 'crypto-js'; // Add this import for hashing

export const generateIdempotencyKey = (
    payload: any,
    userToken: string,
    url: string,
  ) => {
    const dataToHash = JSON.stringify(payload) + userToken + url;
    const hash = CryptoJS.MD5(dataToHash).toString(); // Generates a 128-bit key in hex format
    return hash;
  };