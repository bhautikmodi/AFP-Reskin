import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
@Injectable()
export class SalesUserService {

  constructor( private http: Http,private globals: Globals) { }
  getUserAssessDetail(CAssessmentId) 
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Salesuser/getUserAssessDetail/'+CAssessmentId, this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
  return promise;
  }

}