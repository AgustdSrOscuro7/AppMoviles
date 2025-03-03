import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodio-list',
  templateUrl: './episodio-list.component.html',
  styleUrls: ['./episodio-list.component.scss'],
  standalone: false,
})
export class EpisodioListComponent  implements OnInit {

  @Input() episodes: any[] = [];
  @Output() episodeSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('Episodios listos para mostrarse:', this.episodes);
  }

  selectEpisode(episode: any) {
    this.episodeSelected.emit(episode);
  }

}
