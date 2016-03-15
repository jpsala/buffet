import moment from "moment";
export class DateFormatValueConverter {
    toView(value) {
        console.log(value);
        moment.locale('es');
        return moment(moment.utc(value)).format('DD/MM/YYYY');
    }
}