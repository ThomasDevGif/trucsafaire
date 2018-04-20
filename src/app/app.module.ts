import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';
import { MatMenuModule, MatListModule } from '@angular/material';

import { AuthentificationService } from './services/authentification/authentification.service';
import { UserService } from './services/user/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
