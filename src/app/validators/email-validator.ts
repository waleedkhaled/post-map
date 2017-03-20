import {FormControl} from '@angular/forms';

export class EmailValidator {

  static isValid(formControl: FormControl) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formControl.value);

    if (re) {
      return null;
    }

    return {"invalidEmail": true};
  }
}