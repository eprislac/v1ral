import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { CellComponent } from './cell/cell.component';
import { TurnsCounterComponent } from './turns-counter/turns-counter.component';
import { LevelCounterComponent } from './level-counter/level-counter.component';
import { ScoreCounterComponent } from './score-counter/score-counter.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { StateManagerService } from 'sassy-state-manager-ng2'
import { AngularFireModule, FIREBASE_PROVIDERS } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { ScoreService } from './score.service';
import { SoundService } from './sound.service';
import { ControlButtonComponent } from './control-button/control-button.component';
import { InitialsFormComponent } from './initials-form/initials-form.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDt84dRebVRhgTUa5H5o4ROP5VckW3FdHw',
  authDomain: 'viral-game.firebaseapp.com',
  databaseURL: 'https://viral-game.firebaseio.com',
  storageBucket: 'viral-game.appspot.com',
  messagingSenderId: "841938746086"
};

export const appRoutes: Routes = [
  { path: 'start-menu', component: StartMenuComponent},
  { path: 'high-scores', component: HighScoresComponent},
  { path: 'new-game', component: GameboardComponent},
  { 
    path: '',
    redirectTo: '/start-menu',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    CellComponent,
    TurnsCounterComponent,
    LevelCounterComponent,
    ScoreCounterComponent,
    StartMenuComponent,
    HighScoresComponent,
    GameControlsComponent,
    GameGridComponent,
    MenuButtonComponent,
    ControlButtonComponent,
    InitialsFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [ StateManagerService, ScoreService, SoundService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
