import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	roleList;
	companyList;
	stateList;
    userEntity;
	submitted;
	btn_disable;
	header;
   constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private UserService:UserService ) { }
   
  ngOnInit() 
  {
	  debugger
	  this.UserService.getAllRole()
	//.map(res => res.json())
	.then((data) => 
	{
		this.roleList = data;
		}, 
	(error) => 
	{
		alert('error');
	});	
	  
	  this.UserService.getAllCompany()
	//.map(res => res.json())
	.then((data) => 
	{
		this.companyList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	
	 
	 this.UserService.getAllState()
	//.map(res => res.json())
	.then((data) => 
	{
		this.stateList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	
	 
	  let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {	
		 this.header = 'Edit';
		this.UserService.getById(id)
			.then((data) => 
			{
				this.userEntity=data;
				
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
	 }
	 else
	 {
			 this.userEntity = {};
			  this.userEntity.IsActive = '1';
	 }
  } 
  
  addUser(userForm)
  {		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){
			this.submitted = false;
		} else {
			this.userEntity.UserId = 0;
			this.submitted = true;
		}
		if(userForm.valid){
			this.btn_disable = true;
			this.UserService.add(this.userEntity)
			.then((data) => 
			{
				alert('success');
				//this.aa=true;
				this.btn_disable = false;
				this.submitted = false;
				this.userEntity = {};
				userForm.form.markAsPristine();
				this.router.navigate(['users/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});	
		
	}
	}

}