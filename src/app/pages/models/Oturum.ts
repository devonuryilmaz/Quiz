import { Seviye } from "./seviye";

export class Oturum {
    OturumID: number;
    OturumAdi: string;
    isAktif: boolean;
    aktif: string;
    seviyeler: Seviye[] = [];
}