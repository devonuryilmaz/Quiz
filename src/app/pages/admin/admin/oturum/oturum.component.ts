import { Component, OnInit } from '@angular/core';
import { OturumService } from './oturum.service';
import { SeviyeService } from '../seviye/seviye.service';
import { Oturum } from '../../../models/Oturum';
import { FormGroup, FormControl, FormBuilder, Validators, CheckboxControlValueAccessor } from '@angular/forms';
import { Seviye } from '../../../models/seviye';
import { Router } from '@angular/router';

@Component({
  selector: 'oturum',
  templateUrl: './oturum.component.html',
  styleUrls: ['./oturum.component.scss']
})
export class OturumComponent implements OnInit {
  oturumForm: FormGroup;
  submitted = false;
  seviyeler: Seviye[];
  secilmisSeviye: number[] = [];
  constructor(private oturumService: OturumService, private seviyeService: SeviyeService, private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    this.seviyeService.getSeviyeAll(true).subscribe(data => {
      this.seviyeler = data
    })
    this.oturumForm = this.formBuilder.group(
      {
        oturumAdi: ["", Validators.required],
        isAktif: ["", Validators.required],
      }
    )
  }

  addOturum(oturum: Oturum) {
    this.oturumService.addOturum(oturum);
  }

  goster(id: number, event: any) {
    if (event.target.checked == true) {
      this.secilmisSeviye.push(id)
    }
    else {
      const index: number = this.secilmisSeviye.indexOf(id);
      if (index !== -1) {
        this.secilmisSeviye.splice(index, 1)
      }
    }
    console.log("form", this.secilmisSeviye);

  }

  ekle() {
    if (!this.oturumForm.invalid) {
      let oturum: Oturum = Object.assign({}, this.oturumForm.value)
      this.oturumService.addOturum(oturum).subscribe(data => {
        this.secilmisSeviye.forEach(s => {
          this.seviyeService.getSeviyeById(s).subscribe(sev => {
            let seviye = sev;
            seviye["oturumID"] = data["oturumID"]
            console.log("sev", seviye)
            this.seviyeService.updateSeviye(seviye, seviye["kategoriID"]).subscribe(upSev => {
              console.log("upd");
            })
          })

        })
      }, error => { },
        () => {
          this.router.navigateByUrl("/pages/admin/oturum/Liste")
        })
    }
  }

}
