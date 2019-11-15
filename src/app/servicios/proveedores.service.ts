import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  presURL = 'https://appcompras-b3c3f.firebaseio.com/proveedores.json';
  preURL = 'https://appcompras-b3c3f.firebaseio.com/proveedores';

  constructor(private http: HttpClient) { }

  postProveedor(proveedor: any) {
    const newpres = JSON.stringify(proveedor);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.presURL, newpres, { headers }).pipe(
      map(res => {
        console.log(res);
        return res;
      }))
  }

  getProveedores() {
    return this.http.get(this.presURL).pipe(
      map(res => res)
    )
  }

  getProveedor(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url).pipe(
      map(res => res))
  }

  putProveedor(proveedor: any, id$: string) {
    const newpre = JSON.stringify(proveedor);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, { headers }).pipe(
      map(res => {
        console.log(res);
        return res
      }));
  }

  delProveedor(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.delete(url).pipe(
      map(res => res));
  }

}

