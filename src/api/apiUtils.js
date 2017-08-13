class ApiUtil {

  static callApiService(method, path, body, addAuthorization = true, addCsrfToken = true) {
    return this.verifyAndSetCsrfCookie().then(() => {
      return new Promise((resolve, reject) => {
        const apiRequestInfo = this.getApiRequestInfo(method, body, addAuthorization, addCsrfToken);
        return fetch(this.getApiUrl() + path, apiRequestInfo).then((response) => {
          this.processResponse(response, resolve, reject);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

  static getApiRequestInfo(method, body, addAuthorization = true, addCsrfToken = true) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (addCsrfToken) {
      myHeaders.append("X-XSRF-TOKEN", this.getCookie('XSRF-TOKEN'));
    }
    if (addAuthorization) {
      myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("access_token"));
    }

    let info = {
      method: method,
      headers: myHeaders,
      credentials: 'include'
    };

    if (body && method !== 'GET') {
      info.body = JSON.stringify(body);
    }

    return info;
  }

  static getApiUrl() {
    let url = '';
    switch (window.location.host) {
      case "test.localhost:8080":
        url = 'http://test.localhost:9090/';
        break;
      case "www.greatapp.xyz":
        url = 'http://prod.api.greatapp.xyz/';
        break;
      case "https://greatapp-web-client.herokuapp.com":
        url = 'https://greatapp-api-services.herokuapp.com/';
        break;
      case "greatapp-web-client.herokuapp.com":
        url = 'https://greatapp-api-services.herokuapp.com/';
        break;
      case "test.greatapp.xyz":
        url = 'http://uat.api.greatapp.xyz/';
        break;
      default :
        url = 'http://localhost:9090/';
    }
    return url;
  }

  static getAuthUrl() {
    let url = '';
    switch (window.location.host) {
      case "test.localhost:8080":
        url = 'http://test.localhost:9000/';
        break;
      case "www.greatapp.xyz":
        url = 'http://prod.auth.greatapp.xyz/';
        break;
      case "https://greatapp-web-client.herokuapp.com":
        url = 'https://greatapp-authorization-service.herokuapp.com/';
        break;
      case "greatapp-web-client.herokuapp.com":
        url = 'https://greatapp-authorization-service.herokuapp.com/';
        break;
      case "test.greatapp.xyz":
        url = 'http://prod.auth.greatapp.xyz/';
        break;
      default :
        url = 'http://localhost:9000/';
    }
    return url;
  }

  static getCookie(name) {
    if (!document.cookie) {
      return null;
    }

    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
      return null;
    }

    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }

  static processResponse(response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject('There was an error. Try again in a few minutes.');
    }
  }

  static verifyAndSetCsrfCookie() {
    return new Promise((resolve) => {
      if (!this.getCookie('XSRF-TOKEN')) {
        return fetch(ApiUtil.getApiUrl() + "test", {credentials: 'include'}).then(() => {
          resolve();
        });
      }
      resolve();
    });
  }
}

export default ApiUtil;
