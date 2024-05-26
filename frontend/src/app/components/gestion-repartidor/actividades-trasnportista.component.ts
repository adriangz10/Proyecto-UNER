import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';

import { BaseComponent } from '../base/base.component';
import { TransportModalComponent } from '../modals/Transport-modal-component';
import { Transporte } from '../../interface/transport.interface';
import { transporteService } from '../../services/transport.service';


@Component({
  selector: 'app-actividades-transportista',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    BaseComponent,
    TransportModalComponent,
  ],
  templateUrl: './actividades-transportista.component.html',
  styleUrls: ['./actividades-transportista.component.css']
})
export class ActividadesTransportistaComponent implements OnInit {
  transportes: Transporte[] = [];
  selectedTransport: Transporte | null = null;
  displayModal: boolean = false;

  MapeoUsuario:{[key: number]: string} = {
    1: "Carlos Zampedri",
    2: "Federico Fein",
    3: "Facundo Peres",
    5: "Jesus Figueredo",
  }

  constructor(private transporteService: transporteService) {}

  ngOnInit() {
    this.loadTransportes();
  }

  loadTransportes() {
    this.transporteService.getTransporte().subscribe(data => {
      this.transportes = data;
    });
  }

  transporteSeleccionado(transporte: Transporte) {
    this.selectedTransport = transporte;
    this.displayModal = true;
  }

  completeTransporte(transporte: Transporte) {
    transporte.estado = 'finalizado';
    this.transporteService.updateTransporte(transporte.id, { estado: 'finalizado' }).subscribe(() => {
      this.loadTransportes();
      this.displayModal = false;
      this.selectedTransport = null;
    });
  }

  closeModal() {
    this.displayModal = false;
    this.selectedTransport = null;
  }

  get enviosPendientes() {
    return this.transportes.filter(t => t.estado === 'pendiente');
  }

  get enviosCompletados() {
    return this.transportes.filter(t => t.estado === 'finalizado');
  }

  getNombreUsuario(id: number): string {
    return this.MapeoUsuario[id] || "Desconocido";
  }
}
