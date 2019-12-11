import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'workspace-card-tile',
  templateUrl: './card-tile.component.html',
  styleUrls: ['./card-tile.component.scss']
})
export class CardTileComponent implements OnInit {
  @Input() bookTitle;
  @Input() bookSubTitle;
  @Input() smallThumbnail;
  @Input() bookDescription;
  @Input() bookAuthors;
  constructor() {}

  ngOnInit() {}
}
