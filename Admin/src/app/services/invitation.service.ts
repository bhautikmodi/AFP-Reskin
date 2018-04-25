import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from "@angular/common/http";
import { Globals } from '.././globals';
@Injectable()
export class InvitationService {

  constructor(private http: HttpClient,private globals: Globals) { }

  add(InvitationEntity)
  {debugger
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'Invitation/add', InvitationEntity)
       .toPromise()
       .then(
         res => { // Success
           resolve(res);
         },
         msg => { // Error
       reject(msg);
         }
       );
   });		
   return promise;
   }
   
   
    getAll()
   {
   let promise = new Promise((resolve, reject) => {
     this.http.get(this.globals.baseAPIUrl + 'Invitation/getAll')
       .toPromise()
       .then(
         res => { // Success
           resolve(res);
         },
         msg => { // Error
       reject(msg);
         }
       );
   });		
   return promise;
   }
   getIndustry(){
	 
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Invitation/getAllIndustry')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
          }
        );
    });		
    return promise;
    }
 delete(UserInvitationId)
   {
   let promise = new Promise((resolve, reject) => {		
     this.http.get(this.globals.baseAPIUrl + 'Invitation/delete/' + UserInvitationId)
       .toPromise()
       .then(
         res => { // Success
           resolve(res);
         },
         msg => { // Error
       reject(msg);
         }
       );
   });		
   return promise;
   }
   
    ReInvite(UserInvitationId)
   {debugger
   let promise = new Promise((resolve, reject) => {		
     this.http.post(this.globals.baseAPIUrl + 'Invitation/ReInvite/' ,UserInvitationId)
       .toPromise()
       .then(
         res => { // Success
           resolve(res);
         },
         msg => { // Error
       reject(msg);
         }
       );
   });		
   return promise;
   }
  
   
  //  getById(UserInvitationId)
  //  {debugger
  //  let promise = new Promise((resolve, reject) => {
  //    this.http.get(this.globals.baseAPIUrl + 'Invitation/getById/' + UserInvitationId, this.globals.headerpath)
  //      .toPromise()
  //      .then(
  //        res => { // Success
  //          resolve(res.json());
  //        },
  //        msg => { // Error
  //      reject(msg);
  //        }
  //      );
  //  });		
  //  return promise;
  //  }  
  }
 
 
