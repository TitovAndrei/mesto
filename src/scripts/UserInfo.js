export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return this._userInfo = { 
            name: this._name.textContent, 
            job: this._job.textContent
        }
    }

    setUserInfo(obj) {
        this._name.textContent = obj.name;
        this._job.textContent = obj.job;
    }
}