# Atase: Rusca Dil Egitimi ve Diplomasi Platformu

Atase, modern yazilim mimarisi ile akademik Rusca mufredatini birlestiren, acik kaynak materyaller uzerine insa edilmis ve diplomatik hassasiyetle kurgulanmis bir dil ogrenme ekosistemidir. Geleneksel yontemlerin otesine gecerek; oyunlastirma, interaktif kutuphane ve akilli ses motoru ile butunlesik bir deneyim sunar.

<p align="center">
  <img src="public/atase.gif" alt="Atase Tanıtım">
</p>

---

## Proje Vizyonu

Atase, sadece kelime ezberleten bir uygulama degil, Rusca dilinin ruhunu ve kulturel derinligini (klasik masallar, liyakat sistemi) kullaniciya aktaran dijital bir diplomasi okuludur. "Rusca Sozunun Diplomatlari" projesi kapsaminda, en yuksek yazilim standartlari (Next.js 14+, Drizzle ORM, Tailwind) kullanilarak insa edilmistir.

## Temel Ozellikler

Atase'yi diger platformlardan ayiran temel moduller:

- **Akademik Kurikulum**: Baslangictan ileri seviyeye, liyakat temelli ilerleme sunan unite yapisi.
- **Atase Kutuphanesi**: Klasik Rus edebiyatindan secilmis masallari, seviyelendirilmis (A1.1, A1.2) ve sayfa tabanli interaktif bir formatta sunan dijital kutuphane.
- **Kelime Oyunu**: Unitelerdeki kelime dagarcigini pekistiren, zamana karsi yararsilan yuksek etkilesimli oyun modulu.
- **Akilli Ses Sentezi (TTS)**: Tarayici uzerinde calisan, Turkce aciklamalari filtreleyerek sadece Rusca metinleri profesyonel tonda seslendiren akilli motor.
- **Liyakat ve Rekabet**: Kullanici puanlarina dayali rutbe sistemi ve kuresel liderlik tablosu.

## Teknoloji Yigini

- **Framework**: Next.js 14+ (App Router)
- **Veritabani**: Neon PostgreSQL (Serverless)
- **ORM**: Drizzle ORM
- **Kimlik Dogrulama**: Clerk
- **Stil**: Tailwind CSS & Shadcn UI
- **Durum Yonetimi**: Zustand

## Klasor Yapisi

Uygulamanin moduler hiyerarsisi asagidadir:

```text
atase/
  |- actions/       # Sunucu tarafi islemler (Puan, ilerleme, sifirlama server actionlari)
  |- app/           # Next.js App Router (Ogrenme modulleri, kutuphane ve yonetim paneli)
  |- components/    # Reaktif bilesenler (WordGame motoru, Kitap okuyucu ve UI kit)
  |- constants/     # Kutuphane icerikleri ve statik veri setleri
  |- db/            # Veritabani semasi ve sorgu katmani
  |- lib/           # Akilli TTS motoru ve yardimci fonksiyonlar
  |- public/        # Optimize edilmis "Ushanka Bear" assetleri ve marka gorselleri
  |- scripts/       # Mufredat yukleme ve veritabani senkronizasyon betikleri
  |- store/         # Merkezi durum yonetimi (Zustand)
```

## Baslangic Rehberi

Projeyi yerel ortamda ilklendirmek icin asagidaki adimlar izlenmelidir.

### 1. Hazirlik
- Node.js (v18+) yuklu oldugundan emin olun.
- Projeyi klonlayin ve kok dizinde bir .env dosyasi olusturun.

### 2. Cevresel Degiskenler (.env)
Asagidaki sablonu kullanin:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL=http://localhost:3000
CLERK_ADMIN_IDS="user_..."
```

### 3. Kurulum ve Veri Yukleme
```bash
# Bagimliliklari yukle
npm install --legacy-peer-deps

# Veritabanini olustur ve Atase mufredatini yukle
npm run db:push && npm run db:prod
```

### 4. Calistirma
```bash
npm run dev
```

---
© 2026 Çetin Karakulak & Sena Karakulak - Rusca Sozunun Diplomatlari Proje Yarismasi kapsaminda, acik kaynak materyaller ve topluluk projeleri uzerine insa edilmistir.

## Lisans

MIT License
Copyright (c) 2026 Çetin Karakulak & Sena Karakulak
