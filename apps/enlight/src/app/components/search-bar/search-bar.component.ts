import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksFacade } from '../../+state/books.facade';
import { CommonService } from '@workspace/libs/services';

@Component({
  selector: 'workspace-ui-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder;
  @Output() searchValue = new EventEmitter();

  public searchInput: string;

  constructor(private booksFacade: BooksFacade) {}

  ngOnInit() {}

  public onSearch() {
    this.booksFacade.dispatchSearchKeyToStore(this.searchInput);
  }
}
