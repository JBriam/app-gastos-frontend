import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gasto } from '../models/gasto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Disponible en toda la app
})
export class GastoService {
  private apiUrl = 'http://localhost:8080/api/gastos'; // Cambia si usas otro puerto/backend

  constructor(private http: HttpClient) {} // HttpClient se inyecta correctamente

  // Agregar un gasto
  agregarGasto(gasto: Omit<Gasto, 'id' | 'fecha' | 'hora'>): Observable<Gasto> {
    return this.http.post<Gasto>(this.apiUrl, gasto);
  }

  // Obtener todos los gastos
  obtenerGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.apiUrl);
  }

  obtenerTotal(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  eliminarGasto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}