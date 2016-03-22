import {inject, LogManager} from'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class Config {
    local = false;
    //urlApi = 'http://localhost/iae/?r=api';
    //urlApi = 'http://iae.dyndns.org/iae2/?r=api';
    logger = LogManager.getLogger("JP");
    constructor(ea) {
        this.ea = ea;
        this.urlApi = this.local?'http://localhost/iae/?r=buffetApi':'http://iae.dyndns.org/iae/?r=buffetApi';
        this.sub = this.ea.subscribe('log', (o)=> {
            this.logger.info(o);
        })
    }

    dispose() {
        console.log('dispose');
        this.sub.dispose();
    }


}
