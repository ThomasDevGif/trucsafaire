import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-dialog-search',
  templateUrl: './recipe-dialog-search.component.html',
  styleUrls: ['./recipe-dialog-search.component.scss']
})
export class RecipeDialogSearchComponent implements OnInit {

  public inputSearch: string;

  constructor() { }

  ngOnInit() {
  }

}
