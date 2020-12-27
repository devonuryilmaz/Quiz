import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS_USER } from './pages-menu';
import { AuthService } from './auth/auth.service';
import { AuthHelper } from './auth/auth-helper';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {


  loggedIn: any;
  userActor: any;


  constructor(private authHelper: AuthHelper, private router: Router) {
    this.userActor = this.authHelper.userActor;
    this.loggedIn = this.authHelper.loggedIn;
    if (this.authHelper.token) {
      if (this.userActor) {
        this.menu.push({
          title: 'Anasayfa',
          icon: 'nb-home',
          link: '/pages/dashboard',
          home: true,
        })
        console.log('initialize')
        this.initialize()

      } else {
        this.menu.push({
          title: 'Anasayfa',
          icon: 'nb-home',
          link: '/pages/dashboard',
          home: true,
        })
        // , {
        //   title: 'Raporlarım',
        //   icon: 'nb-shuffle',
        //   link: '/pages/rapor',

        // })
      }

    }



  }
  menu = MENU_ITEMS_USER;
  initialize() {


    this.menu.push({

      title: 'Admin',
      icon: 'nb-locked',
      children: [
        {
          title: 'Atıf',
          icon: 'nb-locked',
          children: [
            {
              title: 'Atıf Kategori',
              link: '/pages/atif/kategori',
            },
            {
              title: 'Atıf Seviye',
              link: '/pages/atif/seviye',
            },
            {
              title: 'Atıf Soru',
              link: '/pages/atif/soru',
            },

          ]
        },
        {
          title: 'Gerçeklerle Yüzleşme',
          icon: 'nb-locked',
          children: [
            {
              title: 'Gerçeklerle Yüzleşme Kategori',
              link: '/pages/facetoface/kategori',
            },
            {
              title: 'Gerçeklerle Yüzleşme Seviye',
              link: '/pages/facetoface/seviye',
            },
            {
              title: 'Gerçeklerle Yüzleşme Soru',
              link: '/pages/facetoface/soru',
            },
            {
              title: 'Gerçeklerle Yüzleşme Fotoğraf',
              link: '/pages/facetoface/soruPhoto',
            },
            {
              title: 'Gerçeklerle Yüzleşme Seçenek',
              link: '/pages/facetoface/soruSecenek',
            },
          ]
        },
        {
          title: 'Bakış Biçimlendirme',
          icon: 'nb-locked',
          children: [
            {
              title: 'Bakış Biçimlendirme Kategori',
              link: '/pages/gaze/kategori',
            },
            {
              title: 'Bakış Biçimlendirme Seviye',
              link: '/pages/gaze/seviye',
            },
            {
              title: 'Bakış Biçimlendirme Soru',
              link: '/pages/gaze/soru',
            },
            {
              title: 'Bakış Biçimlendirme Seçenek',
              link: '/pages/gaze/secenek',
            },
          ]
        },
        {
          title: 'Oturum',
          link: '/pages/admin/oturum/Liste',
        },
        {
          title: 'Kategori',
          link: '/pages/admin/kategori',
        },
        {
          title: 'Seviye',
          link: '/pages/admin/seviye',
        },
        {
          title: 'Soru',
          link: '/pages/admin/soru',
        },
        {
          title: 'Seçenek',
          link: '/pages/admin/secenek',
        },
        {
          title: 'Soru Fotoğrafları',
          link: '/pages/admin/soruFotograf',
        },
        {
          title: 'Kullanıcı',
          link: '/pages/admin/kullanici',
        },
        {
          title: 'Kullanıcı Rapor',
          link: '/pages/admin/kullaniciIlerleme',
        },

      ],
    })





  }

}
