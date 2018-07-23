import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2EmojiModule } from 'ng2-emoji';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSnackBarModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSelectModule,
} from '@angular/material';
import { MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';
import { MatMenuModule, MatListModule, MatDialogModule } from '@angular/material';

import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthentificationService } from './services/authentification/authentification.service';
import { ToolbarService } from './services/toolbar/toolbar.service';
import { SnackbarService } from './services/snackbar/snackbar.service';
import { ConverterService } from './utils/converter.service';
import { UserService } from './services/user/user.service';
import { ListService } from './services/list/list.service';
import { ItemService } from './services/item/item.service';

import { AppRoutingModule } from './app-routing.module';
import { AutofocusDirective } from './directives/autofocus.directive';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListComponent } from './components/list/list.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { DialogShareComponent } from './components/dialog-share/dialog-share.component';
import { DialogLoaderComponent } from './components/dialog-loader/dialog-loader.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogIngredientEditComponent } from './components/ingredient/dialog-ingredient-edit/dialog-ingredient-edit.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { RecipeDetailsComponent } from './components/recipe/recipe-details/recipe-details.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipeFabMenuComponent } from './components/recipe/recipe-fab-menu/recipe-fab-menu.component';
import { RecipeFilterComponent } from './components/recipe/recipe-filter/recipe-filter.component';
import { RecipeDialogSearchComponent } from './components/recipe/recipe-dialog-search/recipe-dialog-search.component';
import { SearchRecipePipe } from './pipes/search-recipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    LoginComponent,
    ToolbarComponent,
    ProfileComponent,
    ListComponent,
    DialogConfirmComponent,
    DialogShareComponent,
    DialogLoaderComponent,
    RecipeComponent,
    IngredientComponent,
    NavbarComponent,
    DialogIngredientEditComponent,
    KitchenComponent,
    RecipeDetailsComponent,
    RecipeCreateComponent,
    RecipeFabMenuComponent,
    RecipeFilterComponent,
    RecipeDialogSearchComponent,
    SearchRecipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    Ng2EmojiModule.forRoot(),
  ],
  providers: [
    AuthenticationGuard,
    AuthentificationService,
    ToolbarService,
    SnackbarService,
    ConverterService,
    UserService,
    ListService,
    ItemService
  ],
  entryComponents: [
    DialogConfirmComponent,
    DialogShareComponent,
    DialogLoaderComponent,
    DialogIngredientEditComponent,
    RecipeDialogSearchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
