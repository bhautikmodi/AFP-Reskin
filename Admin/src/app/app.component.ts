import { Component } from '@angular/core';
import { Globals } from './globals';
import { ActivatedRoute } from '@angular/router';
import { RemainingService } from './services/remaining.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	remainingList;
	globals;
	
	constructor(private route: ActivatedRoute, private RemainingService: RemainingService,private global: Globals) { }
    
    ngOnInit()
  {
		this.globals = this.global;
	// this.RemainingService.getAll()
	// //.map(res => res.json())
	// .then((data) => 
	// {
	// 	this.remainingList = data;			
	// }, 
	// (error) => 
	// {
	// 	alert('error');
	// });	
    	
  }
}
