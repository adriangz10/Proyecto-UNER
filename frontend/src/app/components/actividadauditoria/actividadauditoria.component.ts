import { Component } from '@angular/core';
import { ActividadAuditoria } from '../../interface/actividad-uditoria.interface';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadAuditoriaService } from '../../services/actividad-auditoria.service';
import { Busqueda } from '../../interface/busqueda';
import { Subject, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-actividadAuditoria',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, CommonModule, FormsModule],
  templateUrl: './actividadauditoria.component.html',
  styleUrl: './actividadauditoria.component.css',
})
export class ActividadAuditoriaComponent {
  auditoria!: ActividadAuditoria[];
  parametroBusqueda: Busqueda = {
    id: '',
  };

  private searchSubject = new Subject<string>();
  modalShown: any;

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

    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((id) =>
          id
            ? this.actividadAuditoria.getActividadesAuditoriasId(id)
            : this.actividadAuditoria.getActividadesAuditorias()
        )
      )
      .subscribe((data) => {
        this.auditoria = Array.isArray(data) ? data : [data];
      });
    this.searchSubject.next('');
  }

  getActividadAuditId() {
    this.actividadAuditoria
      .getActividadesAuditoriasId(this.parametroBusqueda.id)
      .subscribe((data) => {
        this.auditoria = data;
        console.log(this.auditoria);
      });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }
}
