import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../../model/Producto';
import { EntradaService } from '../../../../service/entrada.service';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent {
  productoId!: number;
  cantidad!: number;
  producto: Producto | null = null;
  error: string = '';

  constructor(private entradaService: EntradaService) { }


  // Función para cargar todas las ventas

  realizarEntrada() {
    this.entradaService.realizarEntrada(this.productoId, this.cantidad).subscribe(
      (producto: Producto) => {
        this.producto = producto;
        this.error = '';
      },
      (error) => {
        this.error = 'Hubo un error al realizar la entrada.';
      }
    );
  }
}