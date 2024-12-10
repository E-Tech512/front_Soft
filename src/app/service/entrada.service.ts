import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiUrl = 'http://localhost:8080/entradas/realizar';  // La URL de la API

  constructor(private http: HttpClient) { }

  realizarEntrada(productoId: number, cantidad: number): Observable<Producto> {
    // Construir los parámetros de la URL
    const params = new HttpParams()
      .set('productoId', productoId.toString())
      .set('cantidad', cantidad.toString());

    // Hacer la solicitud GET con los parámetros
    return this.http.post<Producto>(this.apiUrl, null, { params });
  }

  getVentas(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}