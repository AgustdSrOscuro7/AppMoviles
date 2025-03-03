import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-episodio-card',
  templateUrl: './episodio-card.component.html',
  styleUrls: ['./episodio-card.component.scss'],
  standalone: false,
})
export class EpisodioCardComponent  implements OnInit {

  @Input() episode: any;
  @Input() characters: any[] = [];
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

}
