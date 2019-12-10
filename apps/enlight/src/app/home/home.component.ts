import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BooksFacade } from '../+state/books.facade';
import { CommonService } from '@workspace/libs/services';

@Component({
  selector: 'workspace-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public booksRecords$: any;
  public searchInputData: any;

  constructor(
    private commonService: CommonService,
    private booksFacade: BooksFacade,
    private router: Router
  ) {
    this.booksRecords$ = this.booksFacade.allBooks$;
  }

  ngOnInit() {
    this.searchInputData = this.commonService.searchInput.subscribe();
  }

  OnBookSelect(bookId) {
    this.booksFacade.dispatchSelectedIdToStore(bookId);
    this.router.navigate(['detail']);
  }
}
