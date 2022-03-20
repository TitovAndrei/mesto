export class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        return this._userInfo = { 
            name: this._name, 
            job: this._job
        }
    }

    setUserInfo(obj) {
        this._name.textContent = obj.name;
        this._job.textContent = obj.job;
    }
}