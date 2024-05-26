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
import { EditActividadDto } from '../../dtos/edit-actividad.dto';
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
  imports: [TableModule, TagModule, RatingModule, CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule],
  providers: [ActivitiService],
})
export class TablaActividadesComponent implements OnInit {
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

  mostrarTabla() {
    this.visible = true; 
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

  editItem(item: any) {
    this.actividadSeleccionada = {
      id: item.id,
      descripcion: item.descripcion,
      usuarioActual: item.usuarioActual,
      prioridad: item.prioridad,
      estado: item.estado
    };
    console.log(this.actividadSeleccionada);
    this.accion = 'Editar';
    this.dialogVisible = true;
  }

  deleteItem(item: any) {
    this.activitiService.deleteActividad(item.id).subscribe(
      () => {
        this.actividad = this.actividad.filter(actividad => actividad.id !== item.id);
        console.log('Actividad eliminada exitosamente');
      },
      error => {
        console.error('Error al eliminar la actividad:', error);
      }
    );
  }

  onDialogClose(updatedItem: EditActividadDto) {
    if (this.accion === 'Editar' && updatedItem) {
      this.activitiService.actualizarActividad(updatedItem).subscribe((res:any) => {
        const index = this.data.findIndex(activity => activity.id === res.id);
        if (index !== -1) {
          this.data[index] = res;
        }
        this.dialogVisible = false;
        this.actividadSeleccionada = null;
      });
    }
  }

  guardarActividad() {
    if (this.esEditar) {
      this.activitiService.actualizarActividad(this.actividadSeleccionada).subscribe(
        response => {
          console.log('Actividad actualizada', response);
          this.dialogVisible = false;
          this.getActividades();  
        },
        error => {
          console.error('Error al actualizar actividad', error);
        }
      );
    } 
  }
}
