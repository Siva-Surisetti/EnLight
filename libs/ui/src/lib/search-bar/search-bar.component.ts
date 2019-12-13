import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'poc-ui-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder;
  @Output() searchValue = new EventEmitter();

  public searchInput: string;

  constructor() {}

  ngOnInit() {}

  public onSearch() {
    this.searchValue.emit(this.searchInput);
  }
}
