import moment from "moment";
export class DateFormatValueConverter {
    toView(value) {
        moment.locale('es');
        return moment(moment.utc(value)).format('DD/MM/YYYY');
    }
}