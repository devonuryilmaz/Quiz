import { Component, OnInit, NgModule } from '@angular/core';
import { AuthHelper } from '../../auth/auth-helper';

@NgModule()

@Component({
  selector: 'admin',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AdminComponent implements OnInit {
  /**
   *
   */
  constructor(private authHelper:AuthHelper) {
   
    
  }
  ngOnInit(){
    
  }
  
}