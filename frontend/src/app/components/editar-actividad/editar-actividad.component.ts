import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Actividades } from '../../interface/actividades.interface';
import { ActivitiService } from '../../services/actividad.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-actividad',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule,ReactiveFormsModule], 
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent implements OnChanges {
  @Input() actividad!: Actividades;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() actividadEditada = new EventEmitter<void>();

  form: FormGroup;
  actividades: Actividades[] | undefined;

  constructor(private fb: FormBuilder, private activitiService: ActivitiService) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
      zona: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividad'] && this.actividad) {
      this.form.patchValue(this.actividad);
    }
  }

  guardarActividad(): void {
    if (this.form.valid) {
      const actividadEditada = { ...this.form.value };
      this.activitiService.updateActividad(this.actividad.id, actividadEditada).subscribe(
        () => {
          this.actividadEditada.emit();
          this.visible = false;
          this.visibleChange.emit(this.visible);
          this.getActividades();
        },
        error => {
          console.error('Error al guardar la actividad:', error);
        }
      );
    } else {
      console.error('El formulario no es válido. No se puede guardar la actividad.');
    }
  }

  getActividades(): void {
    this.activitiService.getActividades().subscribe((data) => {
      this.actividades = data;
    });
  }
}
