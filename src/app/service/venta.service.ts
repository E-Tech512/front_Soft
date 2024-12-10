import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Venta } from '../model/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {


  private apiUrl = 'http://localhost:8080/ventas/realizar'; // URL de tu backend

  constructor(private http: HttpClient) { }

  realizarVenta(productoId: number, cantidad: number): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, null, {
      params: {
        productoId: productoId.toString(),
        cantidad: cantidad.toString()
      }
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error', error);
    return [];
  }

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }
}