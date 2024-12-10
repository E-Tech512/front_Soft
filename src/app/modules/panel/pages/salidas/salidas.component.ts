import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../../service/venta.service';
import { Venta } from '../../../../model/Venta';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-salidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent {
  ventas: Venta[] = [];

  productoId!: number;
  cantidad!: number;
  venta!: Venta;
  error: string = '';  // valor predeterminado

  constructor(private ventaService: VentaService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarVentas();
  }

  // Función para cargar todas las ventas
  cargarVentas() {
    this.ventaService.getVentas().subscribe((data) => {
      console.log(data);  // Verifica los datos que se reciben
      this.ventas = data;
      this.cdRef.detectChanges();  // Asegura que los cambios se detecten
    });
  }

  realizarVenta() {
    this.ventaService.realizarVenta(this.productoId, this.cantidad).subscribe(
      (venta: Venta) => {
        this.venta = venta;
        this.error = '';  // resetear error después de una venta exitosa

        // Actualiza las ventas con la nueva venta
        this.ventas.push(venta);

        // Forzar la detección de cambios para actualizar la vista
        this.cdRef.detectChanges();
      },
      (error) => {
        this.error = 'Hubo un error al realizar la venta.';
      }
    );
  }
}
