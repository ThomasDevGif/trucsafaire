import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';
import { MatMenuModule, MatListModule, MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

import { AuthentificationService } from './services/authentification/authentification.service';
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
    DialogLoaderComponent
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
    MatSelectModule
  ],
  providers: [
    AuthentificationService,
    ConverterService,
    UserService,
    ListService,
    ItemService
  ],
  entryComponents: [
    DialogConfirmComponent,
    DialogShareComponent,
    DialogLoaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
