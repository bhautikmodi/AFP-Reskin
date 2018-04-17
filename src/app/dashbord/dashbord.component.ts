import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var AmCharts: any;

@Component({
  selector: 'app-dashbord',
  providers: [ DashboardService ],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  assessmentList;
  constructor(private DashboardService: DashboardService, private globals: Globals, private route: ActivatedRoute,private router: Router) { }
  
   ngOnInit() {  
     
    this.DashboardService.getAllAssement(this.globals.authData.UserId)
		.then((data) => 
		{
      this.assessmentList = data;
      var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
      console.log(this.assessmentList);
      setTimeout(()=>{ 
        var j = 0; 
        var colorarray = ['#001F49','#799628','#F79317','#1BAC98','#65287E','#B8044A'];
        for(let obj of this.assessmentList){          
        for(let domain of obj.domainlist){
          let k = obj.domainlist.indexOf(domain);
          this.assessmentList[j].domainlist[k].color = colorarray[k];
        }
        var chart = AmCharts.makeChart("dashboard_result_bar"+ j, {
          "type": "serial",
          "startDuration": 0,
          "dataProvider": obj.domainlist,
          "valueAxes": [{
            "position": "left",
          "axisAlpha": 1, 
          "integersOnly": true,
            "minimum": 0,
          "maximum": 5,
          "precision" : 0,
            "dashLength": 5
          }],
          "categoryField": "domain",
          "categoryAxis": {
            "gridPosition": "start",
          "axisAlpha": 1, 
          "titleFontSize" : 1,
          "dashLength": 5,
          "labelsEnabled": false
          },
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "ratingscale",
          "fixedColumnWidth": 20,
          "labelText" : "[[value]]"
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          }
        });
        j++;
      }
    },100);
    }, 
		(error) => 
		{
			alert('error');
		});	
    
    
    
  }

}
