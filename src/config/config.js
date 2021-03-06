export class Config {
    static local = document.location.hostname === 'localhost';

    static getUrlBase() {
        return Config.local ? 'http://localhost/iae/' : 'http://iae.dyndns.org/iae';
    }

    static getUrlApi() {
        return Config.getUrlBase() + '/?r=buffetApi';
    }

    static getUrlImages() {
        return Config.local ? './images/' : 'http://iae.dyndns.org/buffet/images/';
    }
}
