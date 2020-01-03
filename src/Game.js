class Game{
    para = 0;
    halkinTalebi = 0;
    kurabiyeninFiyati = 15;
    currentKurabiye = 0;
    soldKurabiye = 0;
    malzeme = 3000;
    kurabiyeMaaliyet = 100;    // 1 adet kurabiyenin maaliyeti
    malzemeSatinAl = 200;     // malzeme satin al butonunun fiyatı




// her 100 ms de bir update fonksiyonu çalışması lazım ki insanlar kurabiye alsın 
update = () =>{
    this.halkinTalebiniGuncelle();
    if(this.currentKurabiye>0 && (Math.random() * 100) < this.halkinTalebi>0){  // eğer kurabiye varsa rastgele sayi üretelim ve bu da halkintalebi 0'dan büyük ise satsın
        this.kurabiyeSat();
    }


    // Çalışanların Üretime katkısı
    if(Date.now() - this.uretimdeCalisanlarinSaniyedeUrettigiKurabiye > 1000){   
    this.currentKurabiye += this.uretimdeCalisanlar.cirak *
        this.uretimdeCalisanlar.ciraginKurabiyeUretimi;    
    this.currentKurabiye += this.uretimdeCalisanlar.kalfa *
        this.uretimdeCalisanlar.kalfanınKurabiyeUretimi;    
    this.currentKurabiye += this.uretimdeCalisanlar.usta *
        this.uretimdeCalisanlar.ustanınKurabiyeUretimi;
    this.uretimdeCalisanlarinSaniyedeUrettigiKurabiye = Date.now();
    
    }
}

// Burada kurabiyenin fiyatı arttıkça talep azalacak ve satın alımlar yavaşlayacak.
halkinTalebiniGuncelle = () =>{
    // kurabiyeye en düşük 1 tl ye 
    // en yüksek 30 tl ye satmak istiyorum
    const rate = 100 - (this.kurabiyeninFiyati / 30) * 100;
    this.halkinTalebi =  Math.floor(Math.min(Math.max(0, rate), 100));
}

kurabiyeSat = () =>{
    this.currentKurabiye -= 1;
    this.para += this.kurabiyeninFiyati;
} 

kurabiyeYap = (sayac=1) =>{
    this.currentKurabiye += sayac;
    this.currentKurabiye++;
    this.malzeme -= this.kurabiyeMaaliyet * sayac;
}

malzemeSatinAlabilirMi = () =>{
    return this.para >= this.malzemeSatinAl;
}

malzemeAl = () =>{
    this.malzeme += 4000;
    this.para -= this.malzemeSatinAl;
}

kurabiyeninFiyatiniArttir = () =>{
    this.kurabiyeninFiyati +=1;
}

kurabiyeninFiyatiniAzalt = () =>{
    if(this.kurabiyeninFiyati > 1)    // Kurabiyenin fiyatını en az 1 tl ye düşürmek istiyoruz.
    {
    this.kurabiyeninFiyati -=1; 
    }    
}

uretimeCalisanAl = type => 
{
    switch(type){
        case "CIRAK":
            this.uretimdeCalisanlar.cirak++;
            this.para -= this.uretimdeCalisanlar.cirakUcreti;
            this.uretimdeCalisanlar.cirakUcreti += Math.floor((this.uretimdeCalisanlar.cirakUcreti / 100) * 10);
            return;
        case "KALFA":
            this.uretimdeCalisanlar.kalfa++;
            this.para -= this.uretimdeCalisanlar.kalfaUcreti;
            this.uretimdeCalisanlar.kalfaUcreti += Math.floor((this.uretimdeCalisanlar.kalfaUcreti / 100) * 15);
            return;
        case "USTA":
            this.uretimdeCalisanlar.usta++;
            this.para -= this.uretimdeCalisanlar.ustaUcreti;
            this.uretimdeCalisanlar.ustaUcreti += Math.floor((this.uretimdeCalisanlar.ustaUcreti / 100) * 20);
            return; 
        default:
            return false;    
    } 
}

// Çalışanlar
uretimdeCalisanlar = {
    cirak: 0,
    cirakUcreti: 200,
    ciraginKurabiyeUretimi: 1,
    kalfa: 0,
    kalfaUcreti: 400,
    kalfanınKurabiyeUretimi: 2,
    usta: 0,
    ustaUcreti: 800,
    ustanınKurabiyeUretimi: 3,
    iscilerinMalzemeTüketimi: 100
};

uretimdeCalisanlarinSaniyedeUrettigiKurabiye = Date.now();

calisanAlabilirMi = type => 
{
    switch(type){
        case "CIRAK":
            return this.para >= this.uretimdeCalisanlar.cirakUcreti;
        case "KALFA":
            return this.para >= this.uretimdeCalisanlar.kalfaUcreti;  
        case "USTA":
            return this.para >= this.uretimdeCalisanlar.ustaUcreti;  
        default:
            return false;    
    } 
}
}
export default Game;