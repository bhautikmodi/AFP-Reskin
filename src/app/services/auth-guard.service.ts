import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService,private router: Router, private globals: Globals) { }

  canActivate(route,state:RouterStateSnapshot) { debugger
	  if(this.authService.isLoggedIn()==true){
			if(state.url.split('/')[2] != undefined){
				this.globals.currentLink = '/'+state.url.split('/')[1]+'/'+state.url.split('/')[2];
			} else {
				this.globals.currentLink = '/'+state.url.split('/')[1];
			} debugger
		  if(state.url=='/login'||(state.url.split('/')[1]=='register' && state.url.split('/')[0]=='')||state.url=='/invitation'||state.url=='/'){
			  this.globals.IsLoggedIn = false;
			  this.router.navigate(['/dashboard']);
			  return false;
		  } else {
			  this.globals.IsLoggedIn = true;
			  return true;
		  }		  
	  } else {
			console.log(state.url.split('/')[1]);
			console.log(state.url.split('/')[0]);
		   if(state.url=='/login' || state.url.split('/')[1]=='resetpass'||(state.url.split('/')[1]=='register' && state.url.split('/')[0]=='')||state.url=='/invitation'||state.url=='/'){
			  if(state.url=='/login'){
				this.globals.check_login = true;
			  }			   
			   this.globals.IsLoggedIn = false;
			  return true;
		   } else {
			   this.globals.IsLoggedIn = false;
			   this.router.navigate(['/login']);
			   return false;
		   }		  
	  }
  }
  
}
