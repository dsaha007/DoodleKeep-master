import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ShowContentComponent } from './show-content/show-content.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from './data.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './welcome/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './welcome/auth.guard';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: 'notes/edit', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'notes/add', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: HomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ShowContentComponent,
    AddTaskComponent,
    HomeComponent,
    WelcomeComponent,
    HeaderComponent,
    AlertComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp({
      apiKey: environment.apiKey, // Replace fireBaseKey with apiKey
      authDomain: environment.authDomain,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId,
      measurementId: environment.measurementId,
    }), // Initialize Firebase
    AngularFireAuthModule, // Import AngularFireAuthModule
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
