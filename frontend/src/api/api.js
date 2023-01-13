class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  async getGroupsInfo({
    pageCurrent = 1,
    limit = 20,
    subjectValue,
    searchValue,
    sortValue,
  }) {
    const res = await fetch(
      `${this._url}/api/groups/?page=${pageCurrent}&limit=${limit}${
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

  async getGroup(id) {
    const res = await fetch(`${this._url}/api/groups/${id ? id : ''}`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getSubject() {
    const res = await fetch(`${this._url}/api/subject/`, {
      method: 'GET',
      headers: this._headers,
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
  url: 'http://backend:8000',
  headers: {
    'content-type': 'application/json',
  },
});

export default api;
