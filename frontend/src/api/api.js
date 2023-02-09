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
    const token = localStorage.getItem('token');
    const authorization = token ? { authorization: `Token ${token}` } : {};
    const res = await fetch(
      `${this._url}/api/groups/?page=${pageCurrent}&limit=${limit}${
        subjectValue ? `&subject=${subjectValue}` : ''
      }${isLabel ? `&label=true` : ''}${
        searchValue ? `&search=${searchValue}` : ''
      }${sortValue ? `&ordering=${sortValue}` : ''}`,
      {
        method: 'GET',
        headers: {
          ...this._headers,
          ...authorization,
        },
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

  async addToFavorites({ id }) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${this._url}/api/groups/${id}/favorite/`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Token ${token}`,
      },
    });
    return this._checkResponse(res);
  }

  async removeFromFavorites({ id }) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${this._url}/api/groups/${id}/favorite/`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Token ${token}`,
      },
    });
    return this._checkResponse(res);
  }

  async addToCart({ id }) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${this._url}/api/groups/${id}/shopping_cart/`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Token ${token}`,
      },
    });
    return this._checkResponse(res);
  }

  async removeFromCart({ id }) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${this._url}/api/groups/${id}/shopping_cart/`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Token ${token}`,
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
  url: 'https://smax.store',
  headers: {
    'content-type': 'application/json',
  },
});

export default api;
