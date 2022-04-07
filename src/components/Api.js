export class Api {
  constructor(options) {
    this._options = options;
  }

  // карточки
  // загрузка с сервера
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(this._checkResponse)
  }

  // отправка на сервер
  createInitialCards(_name, _link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
      method: "POST",
      body: JSON.stringify({
        name: _name,
        link: _link
      })
    })
      .then(this._checkResponse)
  }

  // удаление с сервера
  deleteInitialCards(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._options.headers.authorization}`
      }
    })
      .then(this._checkResponse)
  }

  // отправляем лайк на сервер
  setLikesCards(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      headers: this._options.headers,
      method: "PUT"
    })
      .then(this._checkResponse)
  }

  // получаем колличество лайков с сервера
  deleteLikesCards(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._options.headers.authorization}`
      }
    })
      .then(this._checkResponse)
  }

  // редакритование профиля
  // получение информации с сервера
  getProfileInformation() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    })
      .then(this._checkResponse)
  }

  // отправка информации на сервер 
  setProfileInformation(_name, _about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: _name,
        about: _about
      })
    })
      .then(this._checkResponse)
  }

  // передаем на сервер аватар
  setAvatar(_avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: _avatar
      })
    })
      .then(this._checkResponse)
  }

  //общий метод результата
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}