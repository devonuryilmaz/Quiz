import { Secenek } from "./secenek";
import { SoruFoto } from "./SoruFoto";

export class Soru
    {
        SoruID: number;
        seviyeAdi:string;
        SoruTipi: number;
        SoruNumarasi: number;
        SoruCumlesi: string;
        SeviyeID: number;
        Secenekler: Secenek[];
        soruTipAdi:string;
        url:string;
        soruIcerik:string;
        fotos:SoruFoto[];
        isAktif:boolean;
        aktif:string;
    }