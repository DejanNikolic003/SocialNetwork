class Cookie {
  set(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    let expires = `expires=${date.toUTCString()}`;

    document.cookie = `${name}=${value};expires=${expires}`;
  }

  get(name) {
    let cookieName = `${name}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let splittedCookies = decodedCookie.split(";");

    for (let i = 0; i < splittedCookies.length; i++) {
      let cookie = splittedCookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }

    return "";
  }

  delete(name) {
    let cookieName = `${name}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let splittedCookies = decodedCookie.split(";");

    for (let i = 0; i < splittedCookies.length; i++) {
      let cookie = splittedCookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(cookieName) === 0) {
        this.set(cookieName, 0, 0);
        return;
      }
    }

    return "";
  }
}

export default Cookie;
