import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '@workspace/libs/services';
import { BooksFacade } from 'apps/enlight/src/app/+state/books.facade';

@Component({
  selector: 'workspace-ui-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder;
  @Output() searchValue = new EventEmitter();

  public searchInput: string;

  constructor(
    private commonService: CommonService,
    private booksFacade: BooksFacade
  ) {}

  ngOnInit() {}

  public onKeyUp() {
    // this.commonService.searchInput.next(this.searchInput);
  }
  public onSearch() {
    // this.commonService.searchInput.subscribe((searchKey) => {
    this.booksFacade.dispatchSearchKeyToStore(this.searchInput);
    // });
    // this.searchValue.emit(this.searchInput)
  }
}
