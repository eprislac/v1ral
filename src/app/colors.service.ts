import { Injectable } from '@angular/core';

interface IColor {
  name: string;
  hexVal: string;
  constructor;
}

export class GridColor implements IColor {
  constructor(public name:string, public hexVal:string) { }
}

export const gridColors: Array<string> = [
  'dark-red',
  'goldenrod',
  'dark-blue',
  'dark-green',
  'purple'
];
  
@Injectable()
export class ColorsService {
  gridColors: Array<string>;

  constructor() { 
    this.gridColors = gridColors;
  }

  /**
   * @name randomColor
   * 
   * @description
   * Returns a random css color class from this.gridColors
   * @param maxColor {number} the upper boundary of the color array
   * @return {string}
   */
  public randomColor(maxColor: number): string {
    return this.gridColors[this.randomInt(0, maxColor)];
  }

  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
