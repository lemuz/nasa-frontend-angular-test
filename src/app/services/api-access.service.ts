import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AlbumResponse } from '../models/AlbumResponse';
import { AssetResponse } from '../models/AssetResponse';
import { MetaDataResponse } from '../models/MetaDataResponse';
import { SearchParams } from '../models/SearchParams';
import { Item, SearchResponse } from '../models/SearchResponse';
import { VideoCaptionResponse } from '../models/VideoCaptionResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private DOMINIO = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getMethod(context: string, httpParams: HttpParams): Observable<any>{
    return this.http.get(this.DOMINIO + context, { params: httpParams });
  }

  search(params: SearchParams): Observable<Item[]>{
    let httpParams = new HttpParams();
    // Agregar parámetros si existen
    if (params.q) httpParams = httpParams.set('q', params.q);
    if (params.center) httpParams = httpParams.set('center', params.center);
    if (params.description) httpParams = httpParams.set('description', params.description);
    if (params.description_508) httpParams = httpParams.set('description_508', params.description_508);
    if (params.keywords) httpParams = httpParams.set('keywords', params.keywords);
    if (params.location) httpParams = httpParams.set('location', params.location);
    if (params.media_type) httpParams = httpParams.set('media_type', params.media_type);
    if (params.nasa_id) httpParams = httpParams.set('nasa_id', params.nasa_id);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.page_size) httpParams = httpParams.set('page_size', params.page_size.toString());
    if (params.photographer) httpParams = httpParams.set('photographer', params.photographer);
    if (params.secondary_creator) httpParams = httpParams.set('secondary_creator', params.secondary_creator);
    if (params.title) httpParams = httpParams.set('title', params.title);
    if (params.year_start) httpParams = httpParams.set('year_start', params.year_start);
    if (params.year_end) httpParams = httpParams.set('year_end', params.year_end);
    return this.getMethod(`/search`, httpParams).pipe(
      map((response: SearchResponse) => {
        if (response.collection.items.length > 0) {
          return response.collection.items;
        } else {
          Swal.fire('Advertencia', 'No se encontraron resultados', 'warning');
          return [];
        }
      }),
      catchError(error => {
        Swal.fire('Error', 'No fue posible procesar la petición, contacte con <b>El administrador del sistema</b> si el problema persiste', 'error');
        return of([]);
      })
    );
  }

  asset(nasaId: string, params: any): Observable<Item[]>{
    let httpParams = new HttpParams();
    if (params.orderBy) {
      httpParams = httpParams.append('orderby', params.orderBy);
    }
    return this.getMethod(`/asset/` + nasaId, httpParams).pipe(
      map((response: AssetResponse) => {
        if (response.collection.items.length > 0) {
          return response.collection.items;
        } else {
          Swal.fire('Advertencia', 'No se encontraron resultados', 'warning');
          return [];  // Retorna un array vacío si no hay resultados
        }
      }),
      catchError(error => {
        Swal.fire('Error', 'No fue posible procesar la petición, contacte con <b>El administrador del sistema</b> si el problema persiste', 'error');
        return of([]);  // Retorna un array vacío en caso de error
      })
    );
  }

  metaData(nasaId: string){
    this.getMethod(`/metadata/` + nasaId, new HttpParams()).subscribe(response => {
      const resp: MetaDataResponse = response;
      if (resp.location !== '') {
        this.router.navigate(['/app/home']);

      } else {
        Swal.fire('Advertencia', 'No se encontro informacion', 'warning');
      }
    }, error => {
      Swal.fire('Error', 'No fue posible procesar la peticion, contacte con <b>El administrador del sistema</b> si el problema persiste', 'error');
    });
  }

  videoCaption(nasaId: string){
    this.getMethod(`/captions/` + nasaId, new HttpParams()).subscribe(response => {
      const resp: VideoCaptionResponse = response;
      if (resp.location !== '') {
        this.router.navigate(['/app/home']);

      } else {
        Swal.fire('Advertencia', 'No se encontro informacion', 'warning');
      }
    }, error => {
      Swal.fire('Error', 'No fue posible procesar la peticion, contacte con <b>El administrador del sistema</b> si el problema persiste', 'error');
    });
  }

  album(albumName: string){
    this.getMethod(`/album/` + albumName, new HttpParams()).subscribe(response => {
      const resp: AlbumResponse = response;
      if (resp.collection.items.length > 0) {
        this.router.navigate(['/app/home']);

      } else {
        Swal.fire('Advertencia', 'No se encontraron resultados', 'warning');
      }
    }, error => {
      Swal.fire('Error', 'No fue posible procesar la peticion, contacte con <b>El administrador del sistema</b> si el problema persiste', 'error');
    });
  }

  getResources(jsonUrl: string){
    return this.getMethod(`/asset/`, new HttpParams()).pipe(
      map((response: AssetResponse) => {
        if (response.collection.items.length > 0) {
          return response.collection.items;
        } else {
          Swal.fire('Advertencia', 'No se encontraron resultados', 'warning');
          return [];  // Retorna un array vacío si no hay resultados
        }
      }),
      catchError(error => {
        Swal.fire('Error', 'No fue posible procesar la petición, contacte con <b>El administrador del sistema</b> si el problema persiste', 'error');
        return of([]);  // Retorna un array vacío en caso de error
      })
    );
  }
}
