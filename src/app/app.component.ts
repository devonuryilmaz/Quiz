/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {CONFIG} from '../assets/config'
import config from '../assets/config.json'

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {
    CONFIG.apiURL = config.apiPath;
    console.log(CONFIG.apiURL);
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
