import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as messages from './errorMessages.json';

@Injectable()
export class ErrorMessages {
public MSG = (<any>messages)

 constructor() {}
getError(field, error){
	var message;
    if (error) {
        // console.log("error",error,fieldname);
        if (error.required) {
            var required= this.MSG.ERROR.REQUIRED;
            switch(field){ 
              case 'email' : { message =required.Email } break;
              case 'mobile' : { message =required.mobile } break;
              case 'password' : { message =required.Password } break;
              case 'oldPassword' : { message =required.oldPassword } break;
              case 'newPassword' : { message =required.newPassword } break;
              case 'confirmPassword' : { message =required.confirmPassword } break;
              case 'firstname' : { message =required.firstname } break;
              case 'lastname' : { message =required.lastname } break;
              case 'username' : { message =required.username } break;
            }
        } else if (error.pattern) {
            var pattern= this.MSG.ERROR.PATTERN;
            switch(field){ 
              case 'email' : { message = pattern.Email } break;
            }
        } else if (error.minlength) {
             var minlength= this.MSG.ERROR.MINLENGTH;
             switch(field){ 
              case 'mobile' : { message = minlength.mobile } break;
            }
        } 
        return message;
        }
    }
}