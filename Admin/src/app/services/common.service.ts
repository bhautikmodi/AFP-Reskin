import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
@Injectable()
export class CommonService {

<<<<<<< HEAD
  constructor(private http: Http, private globals: Globals, private router: Router) { }
=======
  constructor(private http: Http, public globals: Globals) { }
>>>>>>> 50d1b5b78a73220700e63768cc81a4a0e65a555a

  get_permissiondata(permission){ 
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Common/get_permissiondata', permission, this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
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

