import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'app-invitation',
  providers: [ InvitationService ],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  InvitationEntity;
	submitted;
	btn_disable;
	header;
  constructor( private http: Http,private globals: Globals, private router: Router, private InvitationService: InvitationService,private route:ActivatedRoute) { }


  ngOnInit() 
  {debugger
  this.globals.msgflag=false;
	  this.InvitationEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	if(id){
		//this.header = 'Edit';
		// this.InvitationService.getById(id)
		// .then((data) => 
		// {
		// 	this.InvitationEntity = data;
		
		// }, 
		// (error) => 
		// {
		// 	alert('error');
		// });	 
	} else {
		this.header = '';
    this.InvitationEntity = {};
	this.InvitationEntity.UserInvitationId = 0;
    this.InvitationEntity.IsActive = '1';
	}

  }
  
  
  
  addInvitation(InvitationForm)
	{		debugger
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.InvitationEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.InvitationEntity.CreatedBy = this.globals.authData.UserId;
			this.InvitationEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(InvitationForm.valid){
			this.btn_disable = true;
			this.InvitationService.add(this.InvitationEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.InvitationEntity = {};
				InvitationForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}			
				this.router.navigate(['/invitation/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}


	clearForm(InvitationForm)
	{
		this.InvitationEntity = {};	
		this.InvitationEntity.UserInvitationId = 0;
		this.InvitationEntity.IsActive = '1';	
		this.submitted = false;
		InvitationForm.form.markAsPristine();
	}	
}
