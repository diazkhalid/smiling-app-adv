class Session {
  static set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static isNotAdmin() {
    this.set('isLoggedIn', false);
    let isLoggedIn = Session.get('isLoggedIn');

    // Ubah nilai isLoggedIn sesuai kebutuhan
    isLoggedIn = false;

    // Simpan kembali session yang sudah diubah
    Session.set('isLoggedIn', isLoggedIn);
  }

  static isAdmin() {
    this.set('isLoggedIn', false);
    let isLoggedIn = Session.get('isLoggedIn');

    // Ubah nilai isLoggedIn sesuai kebutuhan
    isLoggedIn = true;

    // Simpan kembali session yang sudah diubah
    Session.set('isLoggedIn', isLoggedIn);
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }
}

export default Session;
