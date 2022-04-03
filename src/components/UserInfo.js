export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return this._userInfo = {
            name: this._name.textContent,
            about: this._about.textContent,
        }
    }

    setUserInfo(obj) {
        this._name.textContent = obj.name;
        this._about.textContent = obj.about;
    }

    getUserAvatar() {
        return this._userAvatar = {
            link: this._avatar.src
        }
    }

    setUserAvatar(obj) {
        this._avatar.src = obj.avatar
    }
}