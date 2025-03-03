import { Component } from '@angular/core';
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
 

  constructor(private bd: RickyMortyServiceService) {}

  ngOnInit(){
    this.cargarPersonajes();
  }

}
