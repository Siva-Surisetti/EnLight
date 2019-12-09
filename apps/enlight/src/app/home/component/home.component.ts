import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '@workspace/libs/services';
import { HomeService } from '../service/home.service';
import { BooksFacade } from '../../+state/books.facade';
import { Router } from '@angular/router';

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
