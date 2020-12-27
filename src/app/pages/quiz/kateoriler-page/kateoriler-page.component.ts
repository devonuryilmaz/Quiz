import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { KategoriService } from '../../admin/admin/kategori/kategori.service';
import { Kategori } from '../../models/kategorii';
import { AuthHelper } from '../../auth/auth-helper';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { AtifKategori } from '../../models/AtifKategori';
import { GazeKategori } from '../../models/GazeKategori';
import { FacetofaceKategori } from '../../models/FacetofaceKategori';
import { Router } from '@angular/router';


@Component({
  selector: 'kateoriler-page',
  templateUrl: './kateoriler-page.component.html',
  styleUrls: ['./kateoriler-page.component.scss']
})
export class KateorilerPageComponent implements OnInit {
  kategoriler: Kategori[];
  atifKategoriler: AtifKategori[];
  gazeCastKategoriler: GazeKategori[];
  facetoFaceKategoriler: FacetofaceKategori[];
  video: string;
  @Input() kategoriAdi: string;
  constructor(private kategoriService: KategoriService, private authHelper: AuthHelper, private windowService: NbWindowService,
    private dialogService: NbDialogService, private router: Router) {
  }

  ngOnInit() {
    this.authHelper.session()
    if (this.authHelper.userActor) {
      this.getKategoriAll();
      this.getAtifKategori();
      this.getGazeKategori()
      this.getFaceKategori()
    }
    else {
      this.router.navigateByUrl("/pages/oturum")
    }
  }

  open(dialog: TemplateRef<any>, kategori: Kategori) {
    this.kategoriAdi = kategori["kategoriAdi"];
    this.dialogService.open(dialog);
  }
  openCustom(dialog: TemplateRef<any>) {

    this.dialogService.open(dialog);
  }

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  openWindow(kategori: Kategori) {
    this.kategoriAdi = kategori["kategoriAdi"];
    this.windowService.open(
      this.contentTemplate,
      { title: this.kategoriAdi },
    );
  }


  getKategoriAll() {
    this.kategoriService.getKategoriAll(false).subscribe(data => {
      this.kategoriler = data;
      console.log('kategoriler', this.kategoriler)
      data.forEach(item => {
        if (item["url"] != null) {
          item["url"] = item["url"].slice(1, item["url"].length)
        }
      })
    })
  }

  getAtifKategori() {
    this.kategoriService.getAtifKategoriService(false).subscribe(data => {
      this.atifKategoriler = data;

      data.forEach(item => {
        if (item["videoUrl"] != null) {
          item["videoUrl"] = item["videoUrl"].slice(1, item["videoUrl"].length)
        }
      })
      console.log('atif kategoriler', this.atifKategoriler)
    })
  }
  getGazeKategori() {
    this.kategoriService.getGazeKategoriService(false).subscribe(data => {
      this.gazeCastKategoriler = data;

      data.forEach(item => {
        if (item["videoUrl"] != null) {
          item["videoUrl"] = item["videoUrl"].slice(1, item["videoUrl"].length)
        }
      })
      console.log('gazeCastKategoriler', this.gazeCastKategoriler)
    })
  }

  getFaceKategori() {
    this.kategoriService.getFacetofaceKategoriService(false).subscribe(data => {
      this.facetoFaceKategoriler = data;

      data.forEach(item => {
        if (item["videoUrl"] != null) {
          item["videoUrl"] = item["videoUrl"].slice(1, item["videoUrl"].length)
        }
      })
      console.log('facetoFaceKategoriler', this.facetoFaceKategoriler)
    })
  }

}
