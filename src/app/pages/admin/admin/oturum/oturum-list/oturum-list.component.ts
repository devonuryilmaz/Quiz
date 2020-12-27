import { Component, OnInit } from '@angular/core';
import { OturumService } from '../oturum.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHelper } from '../../../../auth/auth-helper';
import { Oturum } from '../../../../models/Oturum';
import { Router } from '@angular/router';

@Component({
  selector: 'oturum-list',
  templateUrl: './oturum-list.component.html',
  styleUrls: ['./oturum-list.component.scss']
})
export class OturumListComponent implements OnInit {

  constructor(private oturumService:OturumService, private authHelper:AuthHelper, private router:Router) { }
  settings: any;
  loading:boolean=true;
  source: LocalDataSource = new LocalDataSource();
  oturumlar : Oturum[]=[];
  ngOnInit() {
    this.authHelper.session()
    this.authHelper.authorize()
    this.getAllOturum();
  }

  getAllOturum()
  {
    this.oturumService.getOturumlar().subscribe(data=>{
      this.oturumlar = data;
      this.oturumlar.forEach(o=>{
        if(o.isAktif){
          o.aktif ="Aktif"
        }else{
          o.aktif = "Pasif";
        }
      })
      this.source.load(this.oturumlar);
      this.loading=false;
    })
    this.initializeSettings()
  }
  goEkle(){
    this.router.navigateByUrl("/pages/admin/oturum/Ekle")
  }
  onCustom(event:any){
    
    this.router.navigateByUrl("/pages/admin/oturum/Guncelle/"+event.data["oturumID"])
  }
  
  initializeSettings() {
    this.settings = {
      actions: {
        columnTitle: 'Detay',
        custom:[
          {name: 'viewrecord', title: '<i class="nb-arrow-right"></i>'}
        ],
        position: "right",
        add:false,
        edit:false,
        delete:false,
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        oturumAdi:{
          title: 'Oturum Adı',
          type: 'string',
        },
        aktif: {
          title: 'Aktif mi ?',
          type: 'string',
          filter:false
        },     
      },
      action2: {
        columnTitle: 'Test',
        edit : false
      },
    };
  }

}
