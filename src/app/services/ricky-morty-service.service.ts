import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_RM } from "../config/url.service"
import { map } from "rxjs/operators"
import { Observable } from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class RickyMortyServiceService {
  private episodesImagesUrl = 'assets/episodes-images.json';

  constructor(private http: HttpClient) { }
  
  getPersonajes():any{


    let url = `${URL_RM}/character`;
 
 
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('PERSONAJES_RK',res);
        return res;
      })
    );
  }

  getEpisodes(): Observable<any> {
    let url = `${URL_RM}/episode`;
    return this.http.get<any>(url);
  }

  getEpisode(id: number): Observable<any> {
    let url = `${URL_RM}/episode`;
    return this.http.get<any>(`${url}/${id}`);
  }

  getCharacter(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  // Obtener las imágenes de los episodios desde el JSON local
  getEpisodesImages(): Observable<any> {
    return this.http.get(this.episodesImagesUrl);
 
  }

  getMasPersonajes(url:string):any{
    //let url = `${URL_RM}/character`
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('PERSONAJES_RK',res);
        return res;
      })
    );
 
  }

}
