import { Soru } from "./soru";
import { Kategori } from "./kategorii";

export class Seviye {
    SeviyeID: number;
    SeviyeNumarasi: string;
    kategoriAdi: string;
    siraNumarasi: number;
    aktif: string;
    isAktif: boolean;
    soruSuresi: number;
    KategoriID: number;
    Kategori: Kategori;
    OturumID: number;
    oturumAdi: string;
    oturumAktif: boolean;
    /**
     *
     */
    isAtif: boolean;
    isGazeCast: boolean;
    isFaceToFace: boolean;
    OturumSirasi: number;
    kategoriUrl: string;
    kategoriAciklama: string;
}