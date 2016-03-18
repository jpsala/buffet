import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Config} from '../config/config.js';
import $ from 'jquery';
const AUTH_TOKEN_NAME = 'ml-auth-token';
const CLIENT_ID = 'jp';
@inject(HttpClient, Router, Config)
export default class AuthService {
    _user = {'nombre': '', apellido: '', id: undefined};

    constructor(http, router, config) {
        this.config = config;
        this.http = http;
        this.router = router;
        this.storage = window.localStorage;
        this._user = JSON.parse(this.storage.getItem('user'));
        this.urlAuth = `${this.config.urlApi}/auth`;
        this.urlLogout = `${this.config.urlApi}/logout`;
    }

    confitureAuth() {
        let that = this;
        this.http.configure(config => {
            config
                .withBaseUrl(this.config.urlApi)
                .withDefaults({
                    headers: {
                        'Content-Type': 'application/json',
                        'credentials': 'include',
                        'withCredentials': true
                    },
                    credentials: 'include'
                })
                .withInterceptor({
                    request(request) {
                        if (that.loggedIn) {
                            console.log('api-interceptor-request(sending token):',`${that.getToken()}`, that.router.currentInstruction, request);
                            request.headers.append('Authorization', `${that.getToken()}`);
                        }else{
                            console.log('api-interceptor-request(nada, not logged in)');
                        }
                        return request;
                    },
                    response(response) {
                        return response.json()
                            .then(response=> {
                                let ruta = that.router;
                                //console.log('api-interceptor-response',response,that.router.currentInstruction);
                                console.log('api-interceptor-response',ruta,response);
                                if (response.status === 401) {
                                    let ruta = that.router.currentInstruction;//.config.name;
                                    //console.log('401 en interceptor, ruta:', ruta, 'response:', response);
                                    that.router.navigateToRoute('login');
                                    that.removeToken();
                                    return response;
                                }
                                return response;
                            })
                    }
                });
        });
    }

    @computedFrom('_user')
    get user() {
        return this._user;
    }

    set user(user) {
        this._user = user;
    }

    login(username, password) {
        this
            .http
            .fetch('/auth', {
                method: 'post',
                crossDomain: true,
                headers: {
                    'authorization': `Basic ${CLIENT_ID}`,
                },
                body: json({grant_type: 'password', username: username, password: password})
            })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                }
                throw new Error(response.statusText);
            })
            .then((response) => {
                let token = response.access_token;
                //console.log('login token %O',token);
                this.saveToken(token);
                this.user = response.user;
                this.storage.setItem('user', JSON.stringify(this.user));
                //console.log(this.router.navigateToRoute);
                this.router.navigateToRoute('menu');
            })
            .catch((err) => {
                alert(err)
            });
    }

    logout() {
        if (!this.loggedIn) {
            //this.closeThisWindow();
        }
        this
            .http
            .fetch('/logout', {
                method: 'post',
                crossDomain: true,
            })
            .then((response) => {
                this.storage.removeItem('user');
                this.user = {'nombre': '', 'apellido': ''};
                this.removeToken();
                this.router.navigateToRoute('login');
                return response;
            })
            .catch((err) => {
                alert(err)
            });
        //$.ajax({
        //        url: this.urlLogout,
        //        type: 'POST',
        //        dataType: 'json',
        //        crossDomain: true,
        //        beforeSend: function (request) {
        //            //request.setRequestHeader("Authorization", that.getToken());
        //        },
        //        error: (data) => {
        //            alert(data);
        //        }
        //    })
        //    .then(response=> {
        //        if (response.status === 200) {
        //            this.storage.removeItem('user');
        //            this.user = {'nombre': '', 'apellido': ''};
        //            this.removeToken();
        //            this.router.navigateToRoute('login');
        //            return response;
        //        }
        //        throw new Error(response.statusText);
        //    });
        //return;

    }

    get loggedIn() {
        return this.getToken() !== null;
    }

    getToken() {
        return this.storage.getItem(AUTH_TOKEN_NAME);
    }

    saveToken(token) {
        this.storage.setItem(AUTH_TOKEN_NAME, token);
    }

    removeToken() {
        this.storage.removeItem(AUTH_TOKEN_NAME);
    }

    closeThisWindow() {
        if (!(typeof process === 'undefined') && process.versions.electron) {
            let BrowserWindow = require('electron').remote.BrowserWindow;
            this.win = BrowserWindow.getFocusedWindow();
            this.win.close();
        }
    }
}
