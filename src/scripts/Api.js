class Api {
    constructor({baseUri, authToken}) {
        this._baseUri = baseUri;
        this._authToken = authToken;
    }

    getUserInfo() {
        return this._get('users/me');
    }

    getInitialCards() {
        return this._get('cards');
    }

    setUserInfo({name, about}) {
        return this._patch('users/me', {
            name: name,
            about: about
        });
    }

    createCard({name, link}) {
        return this._post('cards', {
            name: name,
            link: link
        })
    }

    deleteCard(id) {
        return this._delete(`cards/${id}`);
    }

    _get(subPath) {
        return this._getJson(fetch(this._buildUri(subPath), {
            headers: {
                authorization: this._authToken
            }
        }));   
    }

    _patch(subPath, body) {
        return this._getJson(fetch(this._buildUri(subPath), {
            method: 'PATCH',
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }));
    }

    _post(subPath, body) {
        return this._getJson(fetch(this._buildUri(subPath), {
            method: 'POST',
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }));
    }

    _delete(subPath) {
        return this._getJson(fetch(this._buildUri(subPath), {
            method: 'DELETE',
            headers: {
                authorization: this._authToken,
            }
        }));
    }

    _buildUri(subPath) {
        return `${this._baseUri}/${subPath}`;
    }

    _getJson(promiss) {
        return promiss.then(res => {
            if (res.ok)
                return res.json();

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}

export default Api;