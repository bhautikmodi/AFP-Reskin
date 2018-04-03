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
	CountryList;
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
	  this.stateList = {};
	  this.UserService.getAllCountry()
	.then((data) => 
	{ 
		this.CountryList = data;	
		
	}, 
	(error) => 
	{
		alert('error');
	});	
	  
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
	 
	 // this.UserService.getAllState()
	// .then((data) => 
	// {
		// this.stateList = data;
	// }, 
	// (error) => 
	// {
		// alert('error');
	// });	
	 
	  let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {	
		this.header = 'Edit';
		this.UserService.getById(id)
			.then((data) => 
			{ debugger
				this.userEntity=data;
				if(this.userEntity.CountryId > 0){ 
				this.UserService.getStateList(this.userEntity.CountryId)
				.then((data) => 
				{
					this.stateList = data;
				}, 
				(error) => 
				{
					alert('error');
				});
			} 
				
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
		 this.header = 'Add';
			 this.userEntity = {};
			// this.userEntity.IsActive = '1';
	 }
  } 
  
  addUser(userForm)
  {		debugger
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
				//alert('success');
				//this.aa=true;
				this.btn_disable = false;
				this.submitted = false;
				this.userEntity = {};
				userForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}	
				
				
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
	
	
	getStateList()
	{ 
		if(this.userEntity.CountryId > 0){
			this.UserService.getStateList(this.userEntity.CountryId)
			.then((data) => 
			{
				this.stateList = data;
			}, 
			(error) => 
			{
				alert('error');
			});
		} else {
			this.stateList = [];
		}
	}	

}
