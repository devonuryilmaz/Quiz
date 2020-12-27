export class KullaniciRapor
{
    id: number;
    kullaniciID: number;
    kategoriID: number;
    seviyeID: number;
    dogruSayisi: number;
    yanlisSayisi: number;
    isTamamlandi: boolean;
    isKategoriCustom: boolean;
    startDate:Date;
    endDate:Date;
    OturumID:number;
    oturumSirasi: number;
    oturumTamamlandi: boolean;
}