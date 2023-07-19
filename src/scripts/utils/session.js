/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
class Session {
  static shift = 3; // Jumlah pergeseran dalam Caesar Cipher

  static encrypt(data) {
    let encryptedData = '';
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        encryptedData += String.fromCharCode((charCode - 65 + this.shift) % 26 + 65); // Enkripsi huruf kapital
      } else if (charCode >= 97 && charCode <= 122) {
        encryptedData += String.fromCharCode((charCode - 97 + this.shift) % 26 + 97); // Enkripsi huruf kecil
      } else {
        encryptedData += data.charAt(i); // Biarkan karakter non-abjad tidak berubah
      }
    }
    return encryptedData;
  }

  static decrypt(encryptedData) {
    let decryptedData = '';
    for (let i = 0; i < encryptedData.length; i++) {
      const charCode = encryptedData.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        decryptedData += String.fromCharCode((charCode - 65 - this.shift + 26) % 26 + 65); // Dekripsi huruf kapital
      } else if (charCode >= 97 && charCode <= 122) {
        decryptedData += String.fromCharCode((charCode - 97 - this.shift + 26) % 26 + 97); // Dekripsi huruf kecil
      } else {
        decryptedData += encryptedData.charAt(i); // Biarkan karakter non-abjad tidak berubah
      }
    }
    return decryptedData;
  }

  static set(key, value) {
    const encryptedKey = this.encrypt(key);
    const encryptedValue = this.encrypt(JSON.stringify(value));
    sessionStorage.setItem(encryptedKey, encryptedValue);
  }

  static get(key) {
    const encryptedKey = this.encrypt(key);
    const encryptedValue = sessionStorage.getItem(encryptedKey);
    if (encryptedValue) {
      const decryptedValue = this.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    }
    return null;
  }

  static isNotAdmin() {
    this.set('isLoggedIn', false);
    let isLoggedIn = this.get('isLoggedIn');

    // Ubah nilai isLoggedIn sesuai kebutuhan
    isLoggedIn = false;

    // Simpan kembali session yang sudah diubah
    this.set('isLoggedIn', isLoggedIn);
  }

  static isAdmin() {
    this.set('isLoggedIn', false);
    let isLoggedIn = this.get('isLoggedIn');

    // Ubah nilai isLoggedIn sesuai kebutuhan
    isLoggedIn = true;

    // Simpan kembali session yang sudah diubah
    this.set('isLoggedIn', isLoggedIn);
  }

  static remove(key) {
    const encryptedKey = this.encrypt(key);
    sessionStorage.removeItem(encryptedKey);
  }

  static clear() {
    sessionStorage.clear();
  }
}

export default Session;
