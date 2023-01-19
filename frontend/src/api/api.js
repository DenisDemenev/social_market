class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
    this._authorization = 'authorization';
  }

  async getGroupsVk({
    pageCurrent = 1,
    limit = 50,
    subjectValue,
    searchValue,
    sortValue,
    isLabel,
  }) {
    const res = await fetch(
      `${this._url}/api/groups/?page=${pageCurrent}&limit=${limit}${
        subjectValue ? `&subject__slug=${subjectValue}` : ''
      }${isLabel ? `&label=true` : ''}${
        searchValue ? `&search=${searchValue}` : ''
      }${sortValue ? `&ordering=${sortValue}` : ''}`,
      {
        method: 'GET',
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async getGroupsTelegram({
    pageCurrent = 1,
    limit = 50,
    subjectValue,
    searchValue,
    sortValue,
  }) {
    const res = await fetch(
      `${this._url}/api/groups-telegram/?page=${pageCurrent}&limit=${limit}${
        subjectValue ? `&subject__slug=${subjectValue}` : ''
      }${searchValue ? `&search=${searchValue}` : ''}${
        sortValue ? `&ordering=${sortValue}` : ''
      }`,
      {
        method: 'GET',
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async getGroupsInstagram({
    pageCurrent = 1,
    limit = 50,
    subjectValue,
    searchValue,
    sortValue,
  }) {
    const res = await fetch(
      `${this._url}/api/groups-instagram/?page=${pageCurrent}&limit=${limit}${
        subjectValue ? `&subject__slug=${subjectValue}` : ''
      }${searchValue ? `&search=${searchValue}` : ''}${
        sortValue ? `&ordering=${sortValue}` : ''
      }`,
      {
        method: 'GET',
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async getSubject() {
    const res = await fetch(`${this._url}/api/subject/`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async signUp({ email, password, firstName, lastName }) {
    const res = await fetch(`${this._url}/api/users/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
        username: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    return this._checkResponse(res);
  }

  async signIn({ email, password }) {
    const res = await fetch(`${this._url}/api/auth/token/login/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: 'https://smax.store',
  headers: {
    'content-type': 'application/json',
  },
});

export default api;
