import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/app/model/users';
import { ExcelReportService } from 'src/app/service/excel-report.service';
import { UsersService } from 'src/app/service/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  date1!: string;
  date2!: string;
  users: User[] = [];

  constructor(private excelService: ExcelReportService, private userService: UsersService) {}

  ngOnInit(): void { }

  reporte(){
    const strDate1 = moment(this.date1,'DD/MM/YYYY', true).format('YYYY-MM-DD'); 
    const strDate2 = moment(this.date2,'DD/MM/YYYY', true).format('YYYY-MM-DD');
    if (moment(strDate1).isAfter(strDate2)) {
      Swal.fire({
        icon: "error",
        title: "Error en fechas",
        text: "La fecha de Inicio no puede ser posterior a la de Fin"
      });
      this.date1 = '';
      this.date2 = '';
    }
    else{
      this.userService.getUsers(strDate1, strDate2).subscribe(res => {
        this.users = res;
      this.excelService.generateReport(this.users);
    });
    }
  }
}
