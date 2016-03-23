import {noView, inject} from 'aurelia-framework';
import {Config} from '../../config/config.js';
import {Router} from 'aurelia-router';
@noView
@inject(Router)
export class IAE{
    constructor(router){
        this.router = router;
    }

    activate(){
        Config.local = false;
        this.router.navigateToRoute('menu');
        console.log('ok')
    }
}