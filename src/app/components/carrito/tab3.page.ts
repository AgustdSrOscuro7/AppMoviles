import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  episodes: any[] = []; // Lista de episodios
  selectedEpisode: any = null; // Episodio seleccionado
  characters: any[] = []; // Personajes del episodio seleccionado
  episodesImages: any[] = []; // Imágenes de los episodios

  constructor(private bd: RickyMortyServiceService) {}

  ngOnInit() {
    this.loadEpisodes();
    this.loadEpisodesImages();
  }

  // Cargar los episodios desde la API
  loadEpisodes() {
    this.bd.getEpisodes().subscribe((data) => {
      this.episodes = data.results;
      this.matchEpisodesWithImages();
    });
  }

  // Cargar las imágenes de los episodios desde el JSON
  loadEpisodesImages() {
    this.bd.getEpisodesImages().subscribe((data) => {
      this.episodesImages = data.episodes;
      this.matchEpisodesWithImages();
    });
  }

  // Combinar los episodios con sus imágenes
  matchEpisodesWithImages() {
    if (this.episodes.length > 0 && this.episodesImages.length > 0) {
      this.episodes = this.episodes.map((episode) => {
        const imageData = this.episodesImages.find(
          (img) =>
            img.season === this.getSeasonNumber(episode.episode) &&
            img.episode === this.getEpisodeNumber(episode.episode)
        );
        return {
          ...episode,
          image_url: imageData ? imageData.image_url : 'default-image-url.jpg', // Imagen por defecto si no hay coincidencia
        };
      });
    }
  }

  // Obtener el número de temporada desde el campo "episode" (ej: "S01E01" -> 1)
  getSeasonNumber(episodeCode: string): number {
    return parseInt(episodeCode.slice(1, 3), 10);
  }

  // Obtener el número de episodio desde el campo "episode" (ej: "S01E01" -> 1)
  getEpisodeNumber(episodeCode: string): number {
    return parseInt(episodeCode.slice(4, 6), 10);
  }

  // Mostrar detalles del episodio seleccionado
  showDetails(episode: any) {
    this.selectedEpisode = episode;
    this.characters = []; // Limpiar la lista de personajes
    episode.characters.forEach((characterUrl: string) => {
      this.bd.getCharacter(characterUrl).subscribe((character) => {
        this.characters.push(character);
      });
    });
  }

  // Cerrar el modal de detalles
  closeDetails() {
    this.selectedEpisode = null;
    this.characters = []; // Limpiar la lista de personajes
  }
}