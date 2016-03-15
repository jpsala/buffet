import {inject} from 'aurelia-framework';
import AuthorizeStep from '../config/authorize-step';
import AuthService from '../services/auth';
import {Config} from '../config/config.js';
@inject(AuthService, Config)

export class App {
    constructor(auth, config) {
        console.clear();
        console.info('app.constructor');
        this.auth = auth;
        this.config = config;
        this.auth.confitureAuth();
    }

    configureRouter(config, router) {
        config.title = 'Buffet';
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            {route: 'login', name: 'login', moduleId: './auth/login', title: 'Login', auth: false},
            {route: 'menu', name: 'menu', moduleId: './menu', nav: true, title: 'Menú', auth: true},
            {route: '', redirect: 'menu'}
        ]);
        this.router = router;

    }
}
