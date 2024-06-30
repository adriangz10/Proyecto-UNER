import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Transporte } from '../../interface/transport.interface';

@Component({
  selector: 'app-transport-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      header="Detalle del Transporte"
      [(visible)]="display"
      (onHide)="onClose.emit()"
    >
      <div *ngIf="transporte">
        <p><strong>ID:</strong> {{ transporte.id }}</p>
        <p><strong>Descripción:</strong> {{ transporte.descripcion }}</p>
        <p><strong>Dirección:</strong> {{ transporte.direccion }}</p>
        <button
          pButton
          type="button"
          label="Marcar como Finalizado"
          (click)="completeTransporte()"
        ></button>
      </div>
    </p-dialog>
  `,
  styles: [``],
})
export class TransportModalComponent {
  @Input() transporte: Transporte | null = null;
  @Input() display: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onComplete = new EventEmitter<Transporte>();

  completeTransporte() {
    if (this.transporte) {
      this.transporte.estado = 'finalizado';
      this.onComplete.emit(this.transporte);
      this.display = false;
    }
  }

  closeModal() {
    this.display = false;
    this.onClose.emit();
  }
}
