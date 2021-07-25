class UserInfo {
    constructor(userInfo, {nameFieldSelector, aboutFieldSelector, avatarSelector}) {
        this._nameField = document.querySelector(nameFieldSelector);
        this._aboutField = document.querySelector(aboutFieldSelector);
        this._avatarImage = document.querySelector(avatarSelector);

        this.id = userInfo._id;
        this.setAvatar(userInfo);
        this.setUserInfo(userInfo);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            about: this._aboutField.textContent,
        }
    }

    setUserInfo({name, about}) {
        this._nameField.textContent = name;
        this._aboutField.textContent = about;
    }

    getAvatar() {
        return this._avatarImage.src;
    }

    setAvatar({avatar}) {
        this._avatarImage.src = avatar;
    }
}

export default UserInfo;