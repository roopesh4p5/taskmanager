import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor ( private toastrService : ToastrService, private offcanvasService: NgbOffcanvas, config: NgbOffcanvasConfig) {
    config.position = 'end';
		config.backdropClass = 'bg-blur';
		config.keyboard = false;
  }

  

  ngOnInit() : void {

  }

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.toastrService.info("Logout Successfully")
  }

  open(content : any) {
		this.offcanvasService.open(content);
	}
}
