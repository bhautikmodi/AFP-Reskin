import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuditlogService } from '../services/auditlog.service';
import { Globals } from '.././globals';
declare var $,unescape: any;

@Component({
  selector: 'app-login-log',
  providers: [ AuditlogService ],
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnInit {

	loginlogList;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private AuditlogService: AuditlogService, public globals: Globals) 
  {
	
  }

  ngOnInit() { 
    $('.print').on('click',function(){
      window.print();
    });
	$("#excel_btn").click(function() {
            $("#dataTables-example").remove(".print_none").table2excel({
                exclude: ".print_none",
                name: "Excel Document Name",
                filename: "LoginLogList",
				fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: false
           
        });
    });
    this.globals.isLoading = true;
    if(this.globals.authData.RoleId==4){
      this.AuditlogService.getLoginLog()
      .then((data) => 
      { 
        this.loginlogList = data;	
        setTimeout(function(){
        $('#dataTables-example').dataTable( {
          "oLanguage": {
          "sLengthMenu": "_MENU_ Log per Page",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ Log",
                "sInfoFiltered": "(filtered from _MAX_ total Log)",
                "sInfoEmpty": "Showing 0 to 0 of 0 Log"
          }
        });
        $(".loginlog").addClass("selected");
        $(".log").addClass("active");
        $(".loginlog").parent().removeClass("display_block");	
        },100); 	
        this.globals.isLoading = false;
      }, 
      (error) => 
      {
        alert('error');
        this.globals.isLoading = false;
      });    
    } else {		
      this.router.navigate(['/access-denied']);
    }			
  }
	tableToExcel(table, name)
	{
		var uri = 'data:application/vnd.ms-excel;base64,'
		, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
		, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
		, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
		if (!table.nodeType){ table = document.getElementById(table)
		var ctx = {worksheet: name || 'Worksheet', table: table.outerHTML}
		window.location.href = uri + base64(format(template, ctx))}
	}

}



