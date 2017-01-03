import { Injectable, OnInit } from '@angular/core';

@Injectable()

export class SoundService {
  public backgroundLoop = new Audio('../assets/sounds/172561__djgriffin__video-game-7.wav');
  public button = new Audio('../assets/sounds/button.wav');
  public success = new Audio('../assets/sounds/success.wav');

  constructor() { 
    this.button.volume = 0.020;
    this.button.playbackRate = 2;
    this.backgroundLoop.loop = true;
    this.backgroundLoop.volume = 0.020;
    this.success.volume = 0.10;
  }
}
