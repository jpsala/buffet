import {inject, LogManager} from'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class Config {
    urlApi = 'http://localhost/iae/?r=buffetApi';
    //urlApi = 'http://localhost/iae/?r=api';
    //urlApi = 'http://iae.dyndns.org/iae2/?r=api';
    logger = LogManager.getLogger("JP");
    constructor(ea) {
        this.ea = ea;
        this.sub = this.ea.subscribe('log', (o)=> {
            this.logger.info(o);
        })
    }

    dispose() {
        console.log('dispose');
        this.sub.dispose();
    }


}
