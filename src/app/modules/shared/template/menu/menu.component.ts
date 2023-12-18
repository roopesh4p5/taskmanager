import { Component } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  closeResult = '';

	constructor(private offcanvasService: NgbOffcanvas, config: NgbOffcanvasConfig) {
    config.position = 'end';
		config.backdropClass = 'bg-blur';
		config.keyboard = false;
  }
  open(content : any) {
		this.offcanvasService.open(content);
	}
}