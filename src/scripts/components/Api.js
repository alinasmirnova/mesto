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

    setAvatar({avatar}) {
        return this._patch('users/me/avatar', {
            avatar: avatar
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

    toggleLike(cardId, isCurrentlyActive) {
        if (isCurrentlyActive) {
            return this._delete(`cards/likes/${cardId}`);
        }
        else {
            return this._put(`cards/likes/${cardId}`);
        }
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

    _put(subPath) {
        return this._getJson(fetch(this._buildUri(subPath), {
            method: 'PUT',
            headers: {
                authorization: this._authToken
            }
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

    _getJson(promise) {
        return promise.then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`????????????: ${res.status}`);
        });
    }
}

export default Api;