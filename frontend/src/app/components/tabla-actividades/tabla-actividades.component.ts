import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ActivitiService } from '../../services/actividad.service';
import { Actividades } from '../../interface/actividades.interface';
import { FormsModule } from '@angular/forms';
import { Busqueda } from '../../interface/busqueda';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'tablActividadescomponent',
  templateUrl: './tabla-actividades.component.html',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, CommonModule, FormsModule],
  providers: [ActivitiService],
})
export class TablaActividadesComponent implements OnInit {
  actividad!: Actividades[];
  cols!: Column[];
  parametroBusqueda: Busqueda = {
    id: '',
  };

  private searchSubject = new Subject<string>();

  constructor(private activitiService: ActivitiService) {}

  ngOnInit() {
    this.getActividades();

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'prioridad', header: 'Prioridad' },
      { field: 'estado', header: 'Estado' },
      { field: 'zona', header: 'Zona' },
      { field: 'direccion', header: 'Direction' },
      { field: 'acciones', header: 'Acciones' },
    ];

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(id => id ? this.activitiService.getAuditoriasId(id) : this.activitiService.getAuditorias())
    ).subscribe((data) => {
      this.actividad = Array.isArray(data) ? data : [data];
    });
    this.searchSubject.next('');
  }

  getActividades(): void {
    this.activitiService.getAuditorias().subscribe((data) => {
      this.actividad = data
        .filter((item: { Estado: string }) => item.Estado !== 'eliminado')
        .map((item: { Prioridad: string }) => ({
          ...item,
          severity: this.getSeverity(item.Prioridad),
        }));
    });
  }

  deleteActividad(id: string): void {
    this.activitiService.deleteActividad(id).subscribe(() => {
      this.actividad = this.actividad.filter((item) => item.id !== id);
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  getSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    const severityMap: {
      [key: string]:
        | 'success'
        | 'secondary'
        | 'info'
        | 'warning'
        | 'danger'
        | 'contrast'
        | undefined;
    } = {
      baja: 'success',
      media: 'warning',
      alta: 'danger',
    };

    return severityMap[status] || undefined;
  }
}
