import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Categoria } from '../model/categoria';

const apiUrl = 'https://localhost:7132/Categorias';
const apiLoginUrl = 'https://localhost:7132/api/Auth/login';

var httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken() {
    const token = localStorage.getItem('jwt') ?? '';
    console.log('jwt header token ' + token);
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
  }

  Login(usuario: any): Observable<any> {
    return this.http.post<any>(apiLoginUrl, usuario).pipe(
      tap((res: any) => console.log(`Login realizado: ${res.token}`)),
      catchError(this.handleError<any>('Login'))
    );
  }

  getCategorias(): Observable<Categoria[]> {
    this.montaHeaderToken();
    return this.http.get<Categoria[]>(apiUrl, httpOptions).pipe(
      tap(() => console.log('leu as Categorias')),
      catchError(this.handleError<Categoria[]>('getCategorias', []))
    );
  }

  getCategoria(id: string): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Categoria>(url, httpOptions).pipe(
      tap(() => console.log(`leu a Categoria id=${id}`)),

    );
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    this.montaHeaderToken();
    return this.http.post<Categoria>(apiUrl, categoria, httpOptions).pipe(
      tap((cat: Categoria) => console.log(`adicionou a Categoria id=${cat.categoriaId}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }

  updateCategoria(id: string, categoria: Categoria): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, categoria, httpOptions).pipe(
      tap(() => console.log(`atualizou a Categoria id=${id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
  }

  deleteCategoria(id: string): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(() => console.log(`removeu a Categoria id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T); // ← isso retorna undefined como sucesso!
    };
  }
}
