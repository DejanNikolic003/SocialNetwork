import { API_URL } from "../config/env.js";
class User {
  api = `${API_URL}/users`;

  async create(email, username, password) {
    let data = {
      email: email,
      username: username,
      password: password,
    };

    data = JSON.stringify(data);

    fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  async checkIfExists(email, username) {
    const response = await fetch(this.api);
    const result = await response.json();

    return result.some(
      (row) => row.username === username || row.email === email
    );
  }
}

export default User;
