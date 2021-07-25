class Api {
    constructor({baseUri, authToken}) {
        this.baseUri = baseUri;
        this.authToken = authToken;
    }

    getUserInfo() {
        return this._get('users/me');
    }

    getInitialCards() {
        return this._get('cards');
    }

    _get(subPath) {
        return fetch(`${this.baseUri}/${subPath}`, {
            headers: {
                authorization: this.authToken
            }
        })
        .then(res => {
            if (res.ok)
                return res.json();

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

export default Api;