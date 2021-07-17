class UserInfo {
    constructor(nameFieldSelector, aboutFieldSelector) {
        this._nameField = document.querySelector(nameFieldSelector);
        this._aboutField = document.querySelector(aboutFieldSelector);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            about: this._aboutField.textContent
        }
    }

    setUserInfo({name, about}) {
        this._nameField.textContent = name;
        this._aboutField.textContent = about;
    }
}

export default UserInfo;