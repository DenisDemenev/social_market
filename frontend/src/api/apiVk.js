class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
    this._authorization = "authorization";
    this._token = localStorage.getItem("token");
    this._access = localStorage.getItem("access");
    this._authorizationToken = this._token
      ? { authorization: `Token ${this._token}` }
      : {};
    this._authorizationJWT = this._access
      ? { authorization: `Bearer ${this._access}` }
      : {};
  }

  async authVk() {
    const res = await fetch(
      `${this._url}/api/auth/o/vk-oauth2/?redirect_uri=https://smax.store/auth`,
      {
        method: "GET",
        headers: this._headers,
      },
    );
    return this._checkResponse(res);
  }

  async loginVk(location) {
    const res = await fetch(`${this._url}/api/auth/o/vk-oauth2/${location}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} `);
  }
}

const api = new Api({
  url: "https://smax.store",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
