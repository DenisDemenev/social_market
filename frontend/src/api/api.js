class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
    this._authorization = 'authorization';
    this._token = localStorage.getItem('token');
    this._access = localStorage.getItem('access');
    this._authorizationToken = this._token
      ? { authorization: `Token ${this._token}` }
      : {};
    this._authorizationJWT = this._access
      ? { authorization: `Bearer ${this._access}` }
      : {};
  }

  async getGroupsVk({
    pageCurrent = 1,
    limit = 50,
    subjectValue,
    searchValue,
    sortValue,
    isLabel,
    isFavorite,
    isShoppingCart,
  }) {
    const res = await fetch(
      `${this._url}/api/groups/?page=${pageCurrent}&limit=${limit}${
        subjectValue ? `&subject=${subjectValue}` : ''
      }${isLabel ? `&label=true` : ''}${
        isFavorite ? `&is_favorited=true` : ''
      }${isShoppingCart ? `&is_in_shopping_cart=true` : ''}${
        searchValue ? `&search=${searchValue}` : ''
      }${sortValue ? `&ordering=${sortValue}` : ''}`,
      {
        method: 'GET',
        headers: {
          ...this._headers,
          ...this._authorizationToken,
          ...this._authorizationJWT,
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

  async authVk() {
    const res = await fetch(
      `${this._url}/api/auth/o/vk-oauth2/?redirect_uri=https://smax.store/auth`,
      {
        method: 'GET',
        headers: this._headers,
      }
    );
    return this._checkResponse(res);
  }

  async loginVk(location) {
    const res = await fetch(`${this._url}/api/auth/o/vk-oauth2/${location}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    return this._checkResponse(res);
  }

  async addToFavorites({ id }) {
    const res = await fetch(`${this._url}/api/groups/${id}/favorite/`, {
      method: 'POST',
      headers: {
        ...this._headers,
        ...this._authorizationToken,
        ...this._authorizationJWT,
      },
    });
    return this._checkResponse(res);
  }

  async removeFromFavorites({ id }) {
    const res = await fetch(`${this._url}/api/groups/${id}/favorite/`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        ...this._authorizationToken,
        ...this._authorizationJWT,
      },
    });
    return this._checkResponseCart(res);
  }

  async addToCart({ id }) {
    const res = await fetch(`${this._url}/api/groups/${id}/shopping_cart/`, {
      method: 'POST',
      headers: {
        ...this._headers,
        ...this._authorizationToken,
        ...this._authorizationJWT,
      },
    });
    return this._checkResponse(res);
  }

  async removeFromCart({ id }) {
    const res = await fetch(`${this._url}/api/groups/${id}/shopping_cart/`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        ...this._authorizationToken,
        ...this._authorizationJWT,
      },
    });
    return this._checkResponseCart(res);
  }

  async orderCart() {
    const res = await fetch(`${this._url}/api/groups/order_shopping_cart/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        ...this._authorizationToken,
        ...this._authorizationJWT,
      },
    });
    return this._checkResponseCart(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} `);
  }

  _checkResponseCart(res) {
    if (res.ok) {
      return res;
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
