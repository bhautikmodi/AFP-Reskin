import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-competency-area-list',
	providers: [ CompetencyAreaService ],
  templateUrl: './competency-area-list.component.html',
  styleUrls: ['./competency-area-list.component.css']
})
export class CompetencyAreaListComponent implements OnInit {

	areaList;
	deleteEntity;
	msgflag;
	message;
	type;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private CompetencyAreaService: CompetencyAreaService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
	this.CompetencyAreaService.getAll()
	.then((data) => 
	{ 
		this.areaList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Competency Area per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Competency Area",
					"sInfoFiltered": "(filtered from _MAX_ total Competency Area)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Competency  Area"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
	this.msgflag = false;
  }
	
	deletearea(area)
	{ 
		this.deleteEntity =  area;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(area)
	{ 
		this.CompetencyAreaService.delete(area.CAreaId)
		.then((data) => 
		{
			let index = this.areaList.indexOf(area);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.areaList.splice(index, 1);			
			}	
			this.globals.message = 'Delete successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency.";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}

