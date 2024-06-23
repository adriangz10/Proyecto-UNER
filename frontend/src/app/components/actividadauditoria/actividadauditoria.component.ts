
import { Component, ElementRef, ViewChild   } from '@angular/core';
import { ActividadAuditoria } from '../../interface/actividad-uditoria.interface';
import { FormsModule } from '@angular/forms';
import { ActividadAuditoriaService } from '../../services/actividad-auditoria.service';
import { Busqueda } from '../../interface/busqueda';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-actividadAuditoria',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, CommonModule,FormsModule,ButtonModule],
  templateUrl: './actividadauditoria.component.html',
  styleUrl: './actividadauditoria.component.css'
})
export class ActividadAuditoriaComponent {

  @ViewChild('tablaregistros', { static: false }) tablaRegistros!: ElementRef;
  auditoria!: ActividadAuditoria[];
  parametroBusqueda: Busqueda = {
    id: "",
  }

  constructor(private actividadAuditoria: ActividadAuditoriaService) {}
  ngOnInit() {

    this.actividadAuditoria.getActividadesAuditorias().subscribe(
      (data: ActividadAuditoria[]) => {
          this.auditoria = data;
          
      },
      (error: any) => {
        console.error('Error al obtener las actividades de auditoría:', error);
      }
    );
  }

  getActividadAuditId() {
    this.actividadAuditoria.getActividadesAuditoriasId(this.parametroBusqueda.id).subscribe(data => {
        this.auditoria = data;
    }
    ,
    (error: any) => {
      console.error('Error al obtener las actividades de auditoría:', error);
    });
  } 
  downloadPDF(data: any[]): void {
    const filename = 'registro pdf'
    const doc = new jsPDF();
    const columns = Object.keys(data[0]);
    const rows = data.map(item => columns.map(column => item[column]));

    (doc as any).autoTable({
      title: ['Registro historico'],
      head: [columns],
      body: rows,
    });

    doc.save(`${filename}.pdf`);
  }


  downloadCSV(): void {
    const filename = 'registro_csv';
    const csvData = this.convertToCSV(this.auditoria);

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${filename}.csv`);
  }

  convertToCSV(data: any[]): string {
    const separador = ',';
    const keys = Object.keys(data[0]);
    const csvHeader = keys.join(separador) + '\n';

    const csvRows = data.map(row => {
      return keys.map(key => {
        let cell = row[key];
        return cell;
      }).join(separador);
    }).join('\n');

  return csvHeader + csvRows;
  }
}