import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private router: Router) {}

  HandleError(err: HttpErrorResponse) {
    console.log(err);

    switch (err.status) {
      case 422:
        let msg: string = Object.entries(err.error.errors).reduce(
          (mess, [key, value]) => {
            let valueMsg = (value as any)[0];
            return `${mess}, ${key} ${valueMsg}`;
          },
          ''
        );

        alert(msg);
        break;

      case 401:
        alert('You do not have permission to do!!!');
        break;

      case 403:
        alert('You do not have permission to do!!!');
        break;

      case 500:
        alert(err.error);
        break;

      default:
        this.router.navigateByUrl('/fail-connect');
        break;
    }
  }
}
