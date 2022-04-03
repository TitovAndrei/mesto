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
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
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
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  // удаление с сервера
  deleteInitialCards(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._options.headers.authorization}`
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  
  // отправляем лайк на сервер
  setLikesCards(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      headers: this._options.headers,
      method: "PUT"
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  } 

  // получаем колличество лайков с сервера
  deleteLikesCards(cardId) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._options.headers.authorization}`
      }
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  // редакритование профиля
  // получение информации с сервера
  getProfileInformation() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(console.log)
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
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
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
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }
}