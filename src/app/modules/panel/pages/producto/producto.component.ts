import { Component } from '@angular/core';
import { Producto } from '../../../../model/Producto';
import { ProductoService } from '../../../../service/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  producto: Producto = new Producto();
  mensaje: string = '';

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.listarProductos().subscribe(
      (data) => {
        console.log('Datos obtenidos:', data); // Verifica lo que estás recibiendo
        this.productos = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  eliminarProducto(id: number): void {
    // Encontrar el producto por su ID
    const productoAEliminar = this.productos.find((producto) => producto.id === id);

    if (productoAEliminar) {
      // Mostrar confirmación con el nombre del producto
      if (confirm(`¿Seguro que deseas eliminar el producto "${productoAEliminar.nombre}"?`)) {
        this.productoService.eliminarProducto(id).subscribe(() => {
          this.cargarProductos(); // Recargar la lista de productos
          alert(`El producto "${productoAEliminar.nombre}" ha sido eliminado con éxito.`);
        });
      }
    } else {
      alert('Producto no encontrado.');
    }
  }

  crearProducto(): void {
    this.productoService.crearProducto(this.producto).subscribe({
      next: (producto) => {
        this.mensaje = 'Producto creado exitosamente';
        this.producto = new Producto(); // Limpiar formulario después de crear
      },
      error: (err) => {
        this.mensaje = 'Error al crear el producto';
      }
    });
  }


}
