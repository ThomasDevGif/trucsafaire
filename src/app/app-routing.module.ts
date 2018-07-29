import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';

import { LoginComponent } from  './components/login/login.component';
import { ProfileComponent } from  './components/profile/profile.component';
import { ListComponent } from  './components/list/list.component';
import { KitchenComponent } from  './components/kitchen/kitchen.component';
import { RecipeComponent } from  './components/recipe/recipe.component';
import { RecipeDetailsComponent } from  './components/recipe/recipe-details/recipe-details.component';
import { RecipeCreateComponent } from  './components/recipe/recipe-create/recipe-create.component';
import { IngredientComponent } from  './components/ingredient/ingredient.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'kitchen',
    component: KitchenComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'recipes',
    component: RecipeComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'recipe-details',
    component: RecipeDetailsComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'recipe-create',
    component: RecipeCreateComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'ingredients',
    component: IngredientComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: '',
    component: ListComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
