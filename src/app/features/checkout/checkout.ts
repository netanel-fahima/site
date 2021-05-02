export default class Checkout {


  constructor(
    public firstName: any,
    public lastName: any,
    public bdAddress2: any,
    public bdAddress1: any,
    public city: any,
    public postal: any,
    public email: any,
    public phone: any,
    public note: any,
    public createUser: any
  ) {
  }

}


import {FormGroup} from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    }
    else {
      matchingControl.setErrors(null);
    }
  };
}
