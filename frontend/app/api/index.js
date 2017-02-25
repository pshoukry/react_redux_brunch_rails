import _ from 'underscore';
import fetch from 'isomorphic-fetch'

class API {
  getCSRFToken() {
    return _.find(document.getElementsByTagName('meta'), (meta) => {
      return meta.name === 'csrf-token'
    }).content
  }

  get = (url) => {
    return fetch(url, {credentials: 'same-origin'})
  }

  post = (url, params) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRFToken(),
      },
      credentials: 'same-origin'
    })
  }

  patch = (url, params) => {
    return fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRFToken(),
      },
      credentials: 'same-origin'
    })
  }
}

export const api = new API;
