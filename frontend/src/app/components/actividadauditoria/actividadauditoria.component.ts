import { Component, ViewChild, ViewChildren, viewChild, viewChildren } from '@angular/core';
import { ActividadAuditoria } from '../../interface/actividad-uditoria.interface';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadAuditoriaService } from '../../services/actividad-auditoria.service';
import { Busqueda } from '../../interface/busqueda';

@Component({
  selector: 'app-actividadAuditoria',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, CommonModule,FormsModule],
  templateUrl: './actividadauditoria.component.html',
  styleUrl: './actividadauditoria.component.css'
})
export class ActividadAuditoriaComponent {

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

  
  
  convertirAFormatoTexto(data: ActividadAuditoria[]): string {
    let textoFormateado = '';
    for (const actividad of data) {
      textoFormateado += `Id de Registro: ${actividad.id}\n`;
      textoFormateado += `Id de Actividad: ${actividad.id_activ}\n`;
      textoFormateado += `Usuario Asignado: ${actividad.id_usuario_act}\n`;
      textoFormateado += `Usuario Modificación: ${actividad.id_usuario_mood}\n`;
      textoFormateado += `Fecha Modificación: ${actividad.fecha_modificacion}\n`;
      textoFormateado += `Operación: ${actividad.operacion}\n`;
      textoFormateado += `Zona: ${actividad.zona}\n`;
      textoFormateado += `Dirección: ${actividad.direccion}\n`;
      textoFormateado += `Prioridad: ${actividad.prioridad}\n\n`; 
    }
    return textoFormateado;
  }
  descargarTextoPlano() {
    const textoData = this.convertirAFormatoTexto(this.auditoria);
    this.descargarArchivo(textoData, 'auditoria.txt', 'text/plain');
  }
  
  descargarArchivo(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  
}
