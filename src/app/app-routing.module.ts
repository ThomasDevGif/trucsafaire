import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from  './components/login/login.component';
import { ProfileComponent } from  './components/profile/profile.component';
import { ListComponent } from  './components/list/list.component';
import { RecipeComponent } from  './components/recipe/recipe.component';
import { IngredientComponent } from  './components/ingredient/ingredient.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'recipes',
    component: RecipeComponent
  }, {
    path: 'ingredients',
    component: IngredientComponent
  }, {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
