import { Injectable } from '@angular/core';
import { Http } from '@angular//http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable()
export class PendingAssessmentService {

<<<<<<< HEAD
  constructor(private http: HttpClient, private globals: Globals, private router: Router) { }
=======
  constructor(private http: HttpClient, public globals: Globals) { }
>>>>>>> 50d1b5b78a73220700e63768cc81a4a0e65a555a

  getPendingAssessment(){     
    let promise = new Promise((resolve, reject) => {     
      this.http.get(this.globals.baseAPIUrl + 'Dashboard/getPendingAssessment')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
        this.globals.isLoading = false;
        this.router.navigate(['/pagenotfound']);
          }
        );
    });	
    return promise;
    }

}
