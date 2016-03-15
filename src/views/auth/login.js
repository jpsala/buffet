import {inject} from 'aurelia-framework';
// import {HttpClient, json} from 'aurelia-fetch-client';
import AuthService from 'services/auth';

@inject(AuthService)
export class Login {
  username = '';
  password = '';

  constructor(auth) {
    // this.http = http;
    this.auth = auth;
  }

  submit() {
    this.auth.login(this.username, this.password);

      // .fetch('oauth/v2/token', {
      //   method: 'post',
      //   headers: {
      //     'Authorization': 'Basic MV8ydDRycXFxeHI2bzA4MDBnOGtnc3NnZ3Mwb3dzd2tra29zMGtrd28wc3cwbzhva3c4Yzo1eXVjZ2NlbmJuazBnYzBrMDBrc2dnY3djY3djNDBzZzBnb2Nzc2Njd2dnODB3dzRrYw'
      //   },
      //   body: json({
      //     grant_type: 'password',
      //     username: this.username,
      //     password: this.password
      //   })
      // })
      // .then((response) => {
      //   if (response.status === 200) {
      //     return response.json();
      //   }
      //
      //   let err = new Error(response.statusText);
      //   err.response = response;
      //   throw err;
      // })
      // .then(response => console.log(response))
      // .catch((err) => {
      // });
  }
}
