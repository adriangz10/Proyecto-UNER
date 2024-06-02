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
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'tablActividadescomponent',
  templateUrl: './tabla-actividades.component.html',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [ActivitiService],
})
export class TablaActividadesComponent implements OnInit {
  descripcion: string = '';
  prioridad: string = '';
  direccion: string = '';
  zona: string = '';
  mostrarEditarActividad = false;
  visible: boolean = false;
  actividadSeleccionada: any;
  accion: string = '';
  dialogVisible: boolean = false;
  data: any[] = [];
  esEditar: boolean = false;
  actividad!: Actividades[];
  cols!: Column[];
  parametroBusqueda: Busqueda = {
    id: '',
  };

  private searchSubject = new Subject<string>();
  modalShown: any;
  estado: any;

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

    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((id) =>
          id
            ? this.activitiService.getActividadesId(id)
            : this.activitiService.getActividades()
        )
      )
      .subscribe((data) => {
        this.actividad = Array.isArray(data) ? data : [data];
      });
    this.searchSubject.next('');
  }

  mostrarTabla() {
    this.visible = true;
  }

  getActividades(): void {
    this.activitiService.getActividades().subscribe((data: Actividades[]) => {
      this.actividad = data
        .filter((item: Actividades) => item.estado !== 'eliminado')
        .map((item: Actividades) => ({
          ...item,
          severity: this.getSeverity(item.prioridad),
        }));
    });
  }

  deleteActividad(id: string): void {
    this.activitiService.deleteActividad(id).subscribe(() => {
      this.actividad = this.actividad.filter((item) => item.id !== id);
    });
  }

  guardarActividad(form: any): void {}

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

  openModa() {
    this.visible = true;
  }

  editar(data: Actividades) {
    this.descripcion = data.descripcion;
    this.prioridad = data.prioridad;
    this.zona = data.zona;
    this.direccion = data.direccion;
    this.visible = true;
  }
}
