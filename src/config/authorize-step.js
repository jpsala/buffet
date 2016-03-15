import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import AuthService from '../services/auth';

@inject(AuthService)
export default class AuthorizeStep {
    constructor(auth) {
        this.auth = auth;
    }

    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            let isLoggedIn = this.auth.loggedIn;
            if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }

        return next();
    }
}
