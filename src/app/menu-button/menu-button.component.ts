import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})

export class MenuButtonComponent implements OnInit {
  @Input()
  text: string;
  @Input()
  url: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  goToPage(): void {
    this.router.navigate([this.url]);
  }
}
