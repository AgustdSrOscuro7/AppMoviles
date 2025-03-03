import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  personajes: any[] = [];
  url_next: string = '';

  titulo1:string = 'Personajes ****';
  subtitulo1:string = ' ---- Ricky & Morty';


  constructor(private bd: RickyMortyServiceService) {}

  ngOnInit(){
    this.cargarPersonajes();
  }

  async cargarPersonajes() {
    //this.cargando = true;
    await this.bd
      .getPersonajes()
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignación de los personajes de la respuesta
        this.personajes = resp.results;
 
 
        console.log("MISPERSONAJES", this.personajes);
 
 
        this.url_next = resp.info.next;
        console.log("SIGUIENTE", this.url_next);
 
 
      });
  }

  async cargarPersonajesSiguientes() {
    //this.cargando = true;
    await this.bd
      .getMasPersonajes(this.url_next)
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignacion de los personajes de la respuesta
        let masPersonajes = resp.results;


        this.personajes.push(...masPersonajes);


        /*
        for(let i=0;i< masPersonajes.length;i++){
          let unPersonaje = masPersonajes[i];
          this.personajes.push(unPersonaje)
        }
        */


        this.url_next = resp.info.next;
        console.log("SIGUIENTE", this.url_next);


      });
  }

  onIonInfinite(ev: any){
    if (this.url_next !== null) {
      this.cargarPersonajesSiguientes()
    }


    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3000);


  }


}
