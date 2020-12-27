import { Seviye } from "./seviye";

export class Kategori
    {
        KategoriId: number;

        Aciklama:string;

        aktif:string;
        isAktif: boolean;
        tema:number;
        temaAdi:string;
        Seviyeler: Seviye[];

        KategoriAdi: string;
        Url:string;
    }

