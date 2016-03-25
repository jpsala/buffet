import {inject} from 'aurelia-framework';
import AuthorizeStep from '../config/authorize-step';
import AuthService from '../services/auth';
import {CarroService} from '../services/carro';
@inject(AuthService, CarroService)

export class App {
    constructor(auth, carroService) {
        console.clear();
        console.info('app.constructor');
        this.auth = auth;
        this.carroService = carroService;
        this.auth.configureAuth();
    }

    configureRouter(config, router) {
        config.title = 'Buffet';
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            {route: 'login', name: 'login', moduleId: './auth/login', title: 'Login', auth: false},
            {route: 'categorias', name: 'categorias', moduleId: './categorias', nav: true, title: 'Menú', auth: true},
            // {route: 'menu', name: 'menu', moduleId: './menu', nav: false, title: 'Menú', auth: true},
            {route: 'menu/:id', name: 'menu', moduleId: './menu', nav: false, title: 'Menú', auth: true},
            {route: 'solo-carrito', name: 'carrito', moduleId: './solo-carrito', nav: true, title: 'Carrito', auth: true},
            {route: 'print', name: 'print', moduleId: './print', nav: false, title: 'Imprimir', auth: true},
            {route: 'admin', name: 'admin', moduleId: './admin/articulos', nav: true, title: 'Admin', auth: true},
            {route: 'iae', name: 'iae', moduleId: './admin/iae', nav: false, title: 'IAE', auth: true},
            {route: '', redirect: 'categorias'}
        ]);
        this.router = router;

    }
}
