import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';
import { MatMenuModule, MatListModule } from '@angular/material';

import { AuthentificationService } from './services/authentification/authentification.service';
import { ConverterService } from './utils/converter.service';
import { UserService } from './services/user/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AutofocusDirective } from './directives/autofocus.directive';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    LoginComponent,
    ToolbarComponent,
    ProfileComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatListModule
  ],
  providers: [
    AuthentificationService,
    ConverterService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
