import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class CourselevelService {

 constructor(  private http: HttpClient,public globals: Globals) { }
 
add(CourseLevelEntity)
 {
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'CourseLevel/add', CourseLevelEntity)
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
  

delete(del)
  {
	let promise = new Promise((resolve, reject) => {		
    this.http.post(this.globals.baseAPIUrl + 'CourseLevel/delete', del)
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
    this.http.get(this.globals.baseAPIUrl + 'CourseLevel/getAll')
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
  
  getById(ConfigurationId)
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'CourseLevel/getById/' + ConfigurationId)
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
 }

