import { Injectable } from '@angular/core';
import { User } from '../model/users';
import Swal from 'sweetalert2';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {
  private _woorkbook!: ExcelJS.Workbook;
  autor!: string;

  constructor(private auth: AuthService) { }

  generateReport(Users: User[]) {
    if(Users.length != 0){
      this._woorkbook = new ExcelJS.Workbook();
      this.auth.getUserLoggedInData.subscribe((data: any) => {
        this.autor = data.username;
      });
      this._woorkbook.creator = this.autor;
      this.createTable(Users);

      this._woorkbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data]);
        fs.saveAs(blob, 'reporte_usuarios.xlsx')
      })
    }
    else{
      Swal.fire({
        icon: "warning",
        title: "Sin Informacion",
        timer: 2000,
        text: "No se encontraron datos"
      })
    }
  }

  private createTable(Users: User[]): void {
    const sheet = this._woorkbook.addWorksheet('Hoja 1');

    const logo = this._woorkbook.addImage({
      base64: 'data:image/png;base64,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',
      extension: 'png'
    });
    sheet.addImage(logo, 'B2:E5');

    const titleCell = sheet.getCell('F3');
    titleCell.value = '    REPORTE DE USUARIOS';
    titleCell.style.font = {bold: true, size: 24, color: { argb: '71137e'} };

    const headerRow = sheet.getRow(7);
    headerRow.values = ['', 'Id', 'Usuario', 'Nombre', 'Apellido Paterno', 'Apellido Materno'];

    sheet.getColumn('B').width = 10; // Ajustar ancho de la columna 'Id'
    sheet.getColumn('C').width = 20; // Ajustar ancho de la columna 'Usuario'
    sheet.getColumn('D').width = 20; // Ajustar ancho de la columna 'Nombre'
    sheet.getColumn('E').width = 25; // Ajustar ancho de la columna 'Apellido Paterno'
    sheet.getColumn('F').width = 25; // Ajustar ancho de la columna 'Apellido Materno'

    for (let i = 2; i < (headerRow.actualCellCount) + 1; i++) {
      headerRow.getCell(i).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '71137e' } // Color de celda
      };
      headerRow.getCell(i).font = { color: { argb: 'FFFFFF' } }; // Color de texto
      headerRow.getCell(i).alignment = { horizontal: 'center' };
    }

    sheet.autoFilter = {
      from: 'B7', // Celda inicial del rango de datos
      to: 'F7',
    }

    sheet.getColumn('B').alignment = { horizontal: 'center' };

    const rowsToInsert = sheet.getRows(8, Users.length)!;

    for(let i = 0; i < rowsToInsert.length; i++){
      const itemData = Users[i];
      const row = rowsToInsert[i];

      row.values = [
        '',
        itemData.id,
        itemData.username,
        itemData.name,
        itemData.last_name,
        itemData.middle_name
      ]
    }
  }
}
