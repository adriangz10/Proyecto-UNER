import { Component, OnInit } from '@angular/core';
import { Actividades } from '../../interface/actividades.interface';
import { ActivitiService } from '../../services/actividad.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Busqueda } from '../../interface/busqueda';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditarActividadComponent } from '../editar-actividad/editar-actividad.component';
import { FilterService, FilterMatchMode, SelectItem } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tabla-actividades',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    DialogModule,
    ButtonModule,
    EditarActividadComponent,
  ],
  providers: [FilterService],
  templateUrl: './tabla-actividades.component.html',
  styleUrls: ['./tabla-actividades.component.css'],
})
export class TablaActividadesComponent implements OnInit {
  actividades!: Actividades[];
  allActividades!: Actividades[]; // Copia original de los datos
  cols!: Column[];
  estados!: any[];
  parametroBusqueda: Busqueda = { id: '' };
  private searchSubject = new Subject<string>();
  visible: boolean = false;

  mostrarEditarActividad = false;
  actividadSeleccionada!: Actividades;

  matchModeOptions!: SelectItem[];

  constructor(private activitiService: ActivitiService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.getActividades();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'prioridad', header: 'Prioridad' },
      { field: 'estado', header: 'Estado' },
      { field: 'zona', header: 'Zona' },
      { field: 'direccion', header: 'Dirección' },
    ];

    this.estados = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' },
      { label: 'Pendiente', value: 'pendiente' },
    ];

    this.matchModeOptions = [
      { label: 'Comienza con', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contiene', value: FilterMatchMode.CONTAINS },
      { label: 'Termina con', value: FilterMatchMode.ENDS_WITH },
      { label: 'Igual a', value: FilterMatchMode.EQUALS }
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
        this.actividades = Array.isArray(data) ? data : [data];
      });
    this.searchSubject.next('');
  }

  getActividades(): void {
    this.activitiService.getActividades().subscribe((data) => {
      this.actividades = data;
      this.allActividades = [...data];
    });
  }

  deleteActividad(id: string): void {
    this.activitiService.deleteActividad(id).subscribe(() => {
      this.actividades = this.actividades.filter((item) => item.id !== id);
      this.allActividades = this.allActividades.filter((item) => item.id !== id);
    });
  }

  confirmarEliminarActividad(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      this.deleteActividad(id);
    }
  }

  editarActividad(actividad: Actividades): void {
    this.actividadSeleccionada = actividad;
    this.mostrarEditarActividad = true;
  }

  onActividadEditada(): void {
    this.getActividades();
    this.mostrarEditarActividad = false;
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  applyFilter(event: any, field: string, matchMode: string): void {
    const value = event.target.value.trim();
    if (value === '') {
      this.actividades = [...this.allActividades];
    } else {
      this.actividades = this.allActividades.filter((actividad: Record<string, any>) =>
        this.filterService.filters[matchMode](actividad[field], value)
      );
    }
  }
}

