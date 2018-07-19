import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar/toolbar.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService
  ) {
    this.toolbarService.setTitle('Recettes');
    this.toolbarService.setHasReturn(true);
  }

  ngOnInit() {
  }

}
