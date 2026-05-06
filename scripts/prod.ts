import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🚀 Seeding DEFINITIVE Russian Demo (10 Lessons, 50 Pro-level Questions)...");

    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);

    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Rusça", imageSrc: "/ru.svg" }])
      .returning();

    const russianCourseId = courses[0].id;

    // --- UNITE 1: TEMELLER VE SOSYAL GİRİŞ ---
    const unit1 = await db.insert(schema.units).values({
      courseId: russianCourseId,
      title: "1. Ünite",
      description: "Rusçaya Giriş ve Sosyal Temeller",
      order: 1,
    }).returning();

    // U1L1: Selamlaşma ve Temel Onaylar
    const u1l1 = await db.insert(schema.lessons).values({ unitId: unit1[0].id, title: "Selamlaşma", order: 1 }).returning();
    const c1s = await db.insert(schema.challenges).values([
      { lessonId: u1l1[0].id, type: "SELECT", question: 'Hangisi "Merhaba" (Resmi olmayan) demektir?', order: 1 },
      { lessonId: u1l1[0].id, type: "SELECT", question: 'Hangisi "Evet" demektir?', order: 2 },
      { lessonId: u1l1[0].id, type: "ASSIST", question: '"Нет" kelimesinin Türkçe karşılığı nedir?', order: 3 },
      { lessonId: u1l1[0].id, type: "SELECT", question: 'Hangisi "Hoşça kal" demektir?', order: 4 },
      { lessonId: u1l1[0].id, type: "ASSIST", question: '"Как дела?" (Nasılsın?) sorusuna hangisiyle başlanır?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c1s[0].id, correct: true, text: "Привет" }, { challengeId: c1s[0].id, correct: false, text: "Пока" }, { challengeId: c1s[0].id, correct: false, text: "Да" }, { challengeId: c1s[0].id, correct: false, text: "Нет" },
      { challengeId: c1s[1].id, correct: true, text: "Да" }, { challengeId: c1s[1].id, correct: false, text: "Нет" }, { challengeId: c1s[1].id, correct: false, text: "Привет" }, { challengeId: c1s[1].id, correct: false, text: "Пока" },
      { challengeId: c1s[2].id, correct: true, text: "Hayır" }, { challengeId: c1s[2].id, correct: false, text: "Evet" }, { challengeId: c1s[2].id, correct: false, text: "Merhaba" }, { challengeId: c1s[2].id, correct: false, text: "Selam" },
      { challengeId: c1s[3].id, correct: true, text: "Пока" }, { challengeId: c1s[3].id, correct: false, text: "Привет" }, { challengeId: c1s[3].id, correct: false, text: "Да" }, { challengeId: c1s[3].id, correct: false, text: "Нет" },
      { challengeId: c1s[4].id, correct: true, text: "Хорошо (İyi)" }, { challengeId: c1s[4].id, correct: false, text: "Плохо (Kötü)" }, { challengeId: c1s[4].id, correct: false, text: "Да" }, { challengeId: c1s[4].id, correct: false, text: "Нет" },
    ]);

    // U1L2: Şahıs Zamirleri
    const u1l2 = await db.insert(schema.lessons).values({ unitId: unit1[0].id, title: "Zamirler", order: 2 }).returning();
    const c2s = await db.insert(schema.challenges).values([
      { lessonId: u1l2[0].id, type: "SELECT", question: 'Hangisi "Ben" demektir?', order: 1 },
      { lessonId: u1l2[0].id, type: "SELECT", question: 'Hangisi "Sen" demektir?', order: 2 },
      { lessonId: u1l2[0].id, type: "ASSIST", question: '"Он" (Eril O) ne demektir?', order: 3 },
      { lessonId: u1l2[0].id, type: "SELECT", question: 'Hangisi "Biz" demektir?', order: 4 },
      { lessonId: u1l2[0].id, type: "ASSIST", question: '"Они" (Onlar) ne demektir?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c2s[0].id, correct: true, text: "Я" }, { challengeId: c2s[0].id, correct: false, text: "Ты" }, { challengeId: c2s[0].id, correct: false, text: "Он" }, { challengeId: c2s[0].id, correct: false, text: "Она" },
      { challengeId: c2s[1].id, correct: true, text: "Ты" }, { challengeId: c2s[1].id, correct: false, text: "Я" }, { challengeId: c2s[1].id, correct: false, text: "Вы" }, { challengeId: c2s[1].id, correct: false, text: "Мы" },
      { challengeId: c2s[2].id, correct: true, text: "O (Erkek)" }, { challengeId: c2s[2].id, correct: false, text: "O (Kadın)" }, { challengeId: c2s[2].id, correct: false, text: "Biz" }, { challengeId: c2s[2].id, correct: false, text: "Siz" },
      { challengeId: c2s[3].id, correct: true, text: "Мы" }, { challengeId: c2s[3].id, correct: false, text: "Вы" }, { challengeId: c2s[3].id, correct: false, text: "Они" }, { challengeId: c2s[3].id, correct: false, text: "Я" },
      { challengeId: c2s[4].id, correct: true, text: "Onlar" }, { challengeId: c2s[4].id, correct: false, text: "Biz" }, { challengeId: c2s[4].id, correct: false, text: "Siz" }, { challengeId: c2s[4].id, correct: false, text: "Sen" },
    ]);

    // U1L3: Aile ve Yakın Çevre
    const u1l3 = await db.insert(schema.lessons).values({ unitId: unit1[0].id, title: "Aile", order: 3 }).returning();
    const c3s = await db.insert(schema.challenges).values([
      { lessonId: u1l3[0].id, type: "SELECT", question: 'Hangisi "Anne" demektir?', order: 1 },
      { lessonId: u1l3[0].id, type: "SELECT", question: 'Hangisi "Baba" demektir?', order: 2 },
      { lessonId: u1l3[0].id, type: "ASSIST", question: '"Брат" kelimesi hangisidir?', order: 3 },
      { lessonId: u1l3[0].id, type: "SELECT", question: 'Hangisi "Kız kardeş" demektir?', order: 4 },
      { lessonId: u1l3[0].id, type: "ASSIST", question: '"Друг" (Arkadaş) hangisidir?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c3s[0].id, correct: true, text: "Мама" }, { challengeId: c3s[0].id, correct: false, text: "Папа" }, { challengeId: c3s[0].id, correct: false, text: "Сестра" }, { challengeId: c3s[0].id, correct: false, text: "Дочь" },
      { challengeId: c3s[1].id, correct: true, text: "Папа" }, { challengeId: c3s[1].id, correct: false, text: "Мама" }, { challengeId: c3s[1].id, correct: false, text: "Дедушка" }, { challengeId: c3s[1].id, correct: false, text: "Брат" },
      { challengeId: c3s[2].id, correct: true, text: "Erkek Kardeş" }, { challengeId: c3s[2].id, correct: false, text: "Kız Kardeş" }, { challengeId: c3s[2].id, correct: false, text: "Anne" }, { challengeId: c3s[2].id, correct: false, text: "Baba" },
      { challengeId: c3s[3].id, correct: true, text: "Сестра" }, { challengeId: c3s[3].id, correct: false, text: "Брат" }, { challengeId: c3s[3].id, correct: false, text: "Мама" }, { challengeId: c3s[3].id, correct: false, text: "Бабушка" },
      { challengeId: c3s[4].id, correct: true, text: "Arkadaş" }, { challengeId: c3s[4].id, correct: false, text: "Düşman" }, { challengeId: c3s[4].id, correct: false, text: "Akraba" }, { challengeId: c3s[4].id, correct: false, text: "Komşu" },
    ]);

    // U1L4: Temel İhtiyaçlar ve İşaretler
    const u1l4 = await db.insert(schema.lessons).values({ unitId: unit1[0].id, title: "Nesneler", order: 4 }).returning();
    const c4s = await db.insert(schema.challenges).values([
      { lessonId: u1l4[0].id, type: "SELECT", question: 'Hangisi "Ekmek" demektir?', order: 1 },
      { lessonId: u1l4[0].id, type: "SELECT", question: 'Hangisi "Su" demektir?', order: 2 },
      { lessonId: u1l4[0].id, type: "ASSIST", question: '"Кофе" kelimesi hangisidir?', order: 3 },
      { lessonId: u1l4[0].id, type: "SELECT", question: 'Hangisi "Çay" demektir?', order: 4 },
      { lessonId: u1l4[0].id, type: "ASSIST", question: '"Книга" (Kitap) hangisidir?', order: 5 },
      { lessonId: u1l4[0].id, type: "SELECT", question: 'Hangisi "Süt" demektir?', order: 6 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c4s[0].id, correct: true, text: "Хлеб" }, { challengeId: c4s[0].id, correct: false, text: "Вода" }, { challengeId: c4s[0].id, correct: false, text: "Соль" }, { challengeId: c4s[0].id, correct: false, text: "Сахар" },
      { challengeId: c4s[1].id, correct: true, text: "Вода" }, { challengeId: c4s[1].id, correct: false, text: "Вино" }, { challengeId: c4s[1].id, correct: false, text: "Пиво" }, { challengeId: c4s[1].id, correct: false, text: "Молоко" },
      { challengeId: c4s[2].id, correct: true, text: "Kahve" }, { challengeId: c4s[2].id, correct: false, text: "Çay" }, { challengeId: c4s[2].id, correct: false, text: "Süt" }, { challengeId: c4s[2].id, correct: false, text: "Su" },
      { challengeId: c4s[3].id, correct: true, text: "Чай" }, { challengeId: c4s[3].id, correct: false, text: "Кофе" }, { challengeId: c4s[3].id, correct: false, text: "Вода" }, { challengeId: c4s[3].id, correct: false, text: "Сок" },
      { challengeId: c4s[4].id, correct: true, text: "Kitap" }, { challengeId: c4s[4].id, correct: false, text: "Defter" }, { challengeId: c4s[4].id, correct: false, text: "Kalem" }, { challengeId: c4s[4].id, correct: false, text: "Masa" },
      { challengeId: c4s[5].id, correct: true, text: "Молоко" }, { challengeId: c4s[5].id, correct: false, text: "Вода" }, { challengeId: c4s[5].id, correct: false, text: "Кофе" }, { challengeId: c4s[5].id, correct: false, text: "Чай" },
    ]);

    // U1L5: Sentez - Sosyal Hayata Giriş
    const u1l5 = await db.insert(schema.lessons).values({ unitId: unit1[0].id, title: "Edebiyatçı Sentezi: İlk Adımlar", order: 5 }).returning();
    const cS1s = await db.insert(schema.challenges).values([
      { lessonId: u1l5[0].id, type: "ASSIST", question: 'Arkadaşına "Merhaba, nasılsın?" diye sor.', order: 1 },
      { lessonId: u1l5[0].id, type: "SELECT", question: '"Bu benim babam" cümlesini kur.', order: 2 },
      { lessonId: u1l5[0].id, type: "ASSIST", question: '"Anne ve ben buradayız" nasıl denir?', order: 3 },
      { lessonId: u1l5[0].id, type: "SELECT", question: '"Evet, bu su" hangisidir?', order: 4 },
      { lessonId: u1l5[0].id, type: "ASSIST", question: '"Hoşça kal kardeş" cümlesini kur.', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: cS1s[0].id, correct: true, text: "Привет, как дела?" }, { challengeId: cS1s[0].id, correct: false, text: "Пока, как дела?" }, { challengeId: cS1s[0].id, correct: false, text: "Да, как дела?" }, { challengeId: cS1s[0].id, correct: false, text: "Кто ты?" },
      { challengeId: cS1s[1].id, correct: true, text: "Это мой папа" }, { challengeId: cS1s[1].id, correct: false, text: "Я твой папа" }, { challengeId: cS1s[1].id, correct: false, text: "Это мама" }, { challengeId: cS1s[1].id, correct: false, text: "Где папа?" },
      { challengeId: cS1s[2].id, correct: true, text: "Мама и я здесь" }, { challengeId: cS1s[2].id, correct: false, text: "Мама и я там" }, { challengeId: cS1s[2].id, correct: false, text: "Паpa и я здесь" }, { challengeId: cS1s[2].id, correct: false, text: "Где я?" },
      { challengeId: cS1s[3].id, correct: true, text: "Да, это вода" }, { challengeId: cS1s[3].id, correct: false, text: "Нет, bu su" }, { challengeId: cS1s[3].id, correct: false, text: "Да, bu ekmek" }, { challengeId: cS1s[3].id, correct: false, text: "Merhaba su" },
      { challengeId: cS1s[4].id, correct: true, text: "Пока, брат" }, { challengeId: cS1s[4].id, correct: false, text: "Привет, брат" }, { challengeId: cS1s[4].id, correct: false, text: "Я твой брат" }, { challengeId: cS1s[4].id, correct: false, text: "Это брат" },
    ]);

    // --- UNITE 2: EYLEMLER VE DİPLOMATİK HAYAT ---
    const unit2 = await db.insert(schema.units).values({
      courseId: russianCourseId,
      title: "2. Ünite",
      description: "Fiiller, Mekanlar ve Nezaket",
      order: 2,
    }).returning();

    // U2L1: Temel Eylemler (Fiiller)
    const u2l1 = await db.insert(schema.lessons).values({ unitId: unit2[0].id, title: "Eylemler", order: 1 }).returning();
    const c5s = await db.insert(schema.challenges).values([
      { lessonId: u2l1[0].id, type: "SELECT", question: 'Hangisi "Yiyorum" demektir?', order: 1 },
      { lessonId: u2l1[0].id, type: "SELECT", question: 'Hangisi "Okuyorum" demektir?', order: 2 },
      { lessonId: u2l1[0].id, type: "ASSIST", question: '"Я пью" ne demektir?', order: 3 },
      { lessonId: u2l1[0].id, type: "SELECT", question: 'Hangisi "Biliyorum" demektir?', order: 4 },
      { lessonId: u2l1[0].id, type: "ASSIST", question: '"Я пишу" (Yazıyorum) hangisidir?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c5s[0].id, correct: true, text: "Ем" }, { challengeId: c5s[0].id, correct: false, text: "Пью" }, { challengeId: c5s[0].id, correct: false, text: "Иду" }, { challengeId: c5s[0].id, correct: false, text: "Сплю" },
      { challengeId: c5s[1].id, correct: true, text: "Читаю" }, { challengeId: c5s[1].id, correct: false, text: "Пишу" }, { challengeId: c5s[1].id, correct: false, text: "Вижу" }, { challengeId: c5s[1].id, correct: false, text: "Понимаю" },
      { challengeId: c5s[2].id, correct: true, text: "İçiyorum" }, { challengeId: c5s[2].id, correct: false, text: "Yiyorum" }, { challengeId: c5s[2].id, correct: false, text: "Gidiyorum" }, { challengeId: c5s[2].id, correct: false, text: "Okuyorum" },
      { challengeId: c5s[3].id, correct: true, text: "Знаю" }, { challengeId: c5s[3].id, correct: false, text: "Думаю" }, { challengeId: c5s[3].id, correct: false, text: "Хочу" }, { challengeId: c5s[3].id, correct: false, text: "Могу" },
      { challengeId: c5s[4].id, correct: true, text: "Yazıyorum" }, { challengeId: c5s[4].id, correct: false, text: "Okuyorum" }, { challengeId: c5s[4].id, correct: false, text: "Görüyorum" }, { challengeId: c5s[4].id, correct: false, text: "Biliyorum" },
    ]);

    // U2L2: Mekanlar ve Konum
    const u2l2 = await db.insert(schema.lessons).values({ unitId: unit2[0].id, title: "Mekanlar", order: 2 }).returning();
    const c6s = await db.insert(schema.challenges).values([
      { lessonId: u2l2[0].id, type: "SELECT", question: 'Hangisi "Ev" demektir?', order: 1 },
      { lessonId: u2l2[0].id, type: "SELECT", question: 'Hangisi "İş" (Çalışma yeri) demektir?', order: 2 },
      { lessonId: u2l2[0].id, type: "ASSIST", question: '"Школа" ne demektir?', order: 3 },
      { lessonId: u2l2[0].id, type: "SELECT", question: 'Hangisi "Park" demektir?', order: 4 },
      { lessonId: u2l2[0].id, type: "ASSIST", question: '"Город" (Şehir) ne demektir?', order: 5 },
      { lessonId: u2l2[0].id, type: "SELECT", question: 'Hangisi "Banka" demektir?', order: 6 },
      { lessonId: u2l2[0].id, type: "SELECT", question: 'Hangisi "Orman" demektir?', order: 7 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c6s[0].id, correct: true, text: "Дом" }, { challengeId: c6s[0].id, correct: false, text: "Офис" }, { challengeId: c6s[0].id, correct: false, text: "Парк" }, { challengeId: c6s[0].id, correct: false, text: "Улица" },
      { challengeId: c6s[1].id, correct: true, text: "Работа" }, { challengeId: c6s[1].id, correct: false, text: "Школа" }, { challengeId: c6s[1].id, correct: false, text: "Банк" }, { challengeId: c6s[1].id, correct: false, text: "Дом" },
      { challengeId: c6s[2].id, correct: true, text: "Okul" }, { challengeId: c6s[2].id, correct: false, text: "Ev" }, { challengeId: c6s[2].id, correct: false, text: "İş" }, { challengeId: c6s[2].id, correct: false, text: "Kütüphane" },
      { challengeId: c6s[3].id, correct: true, text: "Парк" }, { challengeId: c6s[3].id, correct: false, text: "Лес" }, { challengeId: c6s[3].id, correct: false, text: "Сад" }, { challengeId: c6s[3].id, correct: false, text: "Мост" },
      { challengeId: c6s[4].id, correct: true, text: "Şehir" }, { challengeId: c6s[4].id, correct: false, text: "Köy" }, { challengeId: c6s[4].id, correct: false, text: "Ülke" }, { challengeId: c6s[4].id, correct: false, text: "Meydan" },
      { challengeId: c6s[5].id, correct: true, text: "Банк" }, { challengeId: c6s[5].id, correct: false, text: "Парк" }, { challengeId: c6s[5].id, correct: false, text: "Школа" }, { challengeId: c6s[5].id, correct: false, text: "Дом" },
      { challengeId: c6s[6].id, correct: true, text: "Лес" }, { challengeId: c6s[6].id, correct: false, text: "Сад" }, { challengeId: c6s[6].id, correct: false, text: "Парк" }, { challengeId: c6s[6].id, correct: false, text: "Мост" },
    ]);

    // U2L3: Soru Kalıpları
    const u2l3 = await db.insert(schema.lessons).values({ unitId: unit2[0].id, title: "Sorular", order: 3 }).returning();
    const c7s = await db.insert(schema.challenges).values([
      { lessonId: u2l3[0].id, type: "SELECT", question: 'Hangisi "Kim" demektir?', order: 1 },
      { lessonId: u2l3[0].id, type: "SELECT", question: 'Hangisi "Ne" demektir?', order: 2 },
      { lessonId: u2l3[0].id, type: "ASSIST", question: '"Где" ne demektir?', order: 3 },
      { lessonId: u2l3[0].id, type: "SELECT", question: 'Hangisi "Ne zaman" demektir?', order: 4 },
      { lessonId: u2l3[0].id, type: "ASSIST", question: '"Как" ne demektir?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c7s[0].id, correct: true, text: "Кто" }, { challengeId: c7s[0].id, correct: false, text: "Что" }, { challengeId: c7s[0].id, correct: false, text: "Где" }, { challengeId: c7s[0].id, correct: false, text: "Как" },
      { challengeId: c7s[1].id, correct: true, text: "Что" }, { challengeId: c7s[1].id, correct: false, text: "Кто" }, { challengeId: c7s[1].id, correct: false, text: "Почему" }, { challengeId: c7s[1].id, correct: false, text: "Зачем" },
      { challengeId: c7s[2].id, correct: true, text: "Nerede" }, { challengeId: c7s[2].id, correct: false, text: "Nasıl" }, { challengeId: c7s[2].id, correct: false, text: "Niçin" }, { challengeId: c7s[2].id, correct: false, text: "Kim" },
      { challengeId: c7s[3].id, correct: true, text: "Когда" }, { challengeId: c7s[3].id, correct: false, text: "Где" }, { challengeId: c7s[3].id, correct: false, text: "Кто" }, { challengeId: c7s[3].id, correct: false, text: "Что" },
      { challengeId: c7s[4].id, correct: true, text: "Nasıl" }, { challengeId: c7s[4].id, correct: false, text: "Nerede" }, { challengeId: c7s[4].id, correct: false, text: "Ne" }, { challengeId: c7s[4].id, correct: false, text: "Kim" },
    ]);

    // U2L4: Nezaket ve Diplomatik Kalıplar
    const u2l4 = await db.insert(schema.lessons).values({ unitId: unit2[0].id, title: "Kalıplar", order: 4 }).returning();
    const c8s = await db.insert(schema.challenges).values([
      { lessonId: u2l4[0].id, type: "SELECT", question: 'Hangisi "Teşekkür ederim" demektir?', order: 1 },
      { lessonId: u2l4[0].id, type: "SELECT", question: 'Hangisi "Lütfen" demektir?', order: 2 },
      { lessonId: u2l4[0].id, type: "ASSIST", question: '"Извините" ne demektir?', order: 3 },
      { lessonId: u2l4[0].id, type: "SELECT", question: 'Hangisi "Seni seviyorum" demektir?', order: 4 },
      { lessonId: u2l4[0].id, type: "ASSIST", question: '"Я не знаю" ne demektir?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: c8s[0].id, correct: true, text: "Спасибо" }, { challengeId: c8s[0].id, correct: false, text: "Пожалуйста" }, { challengeId: c8s[0].id, correct: false, text: "Извините" }, { challengeId: c8s[0].id, correct: false, text: "Удачи" },
      { challengeId: c8s[1].id, correct: true, text: "Пожалуйста" }, { challengeId: c8s[1].id, correct: false, text: "Спасибо" }, { challengeId: c8s[1].id, correct: false, text: "Да" }, { challengeId: c8s[1].id, correct: false, text: "Нет" },
      { challengeId: c8s[2].id, correct: true, text: "Affedersiniz" }, { challengeId: c8s[2].id, correct: false, text: "Tebrikler" }, { challengeId: c8s[2].id, correct: false, text: "Lütfen" }, { challengeId: c8s[2].id, correct: false, text: "Hoşça kal" },
      { challengeId: c8s[3].id, correct: true, text: "Я тебя люблю" }, { challengeId: c8s[3].id, correct: false, text: "Я тебя жду" }, { challengeId: c8s[3].id, correct: false, text: "Я тебя вижу" }, { challengeId: c8s[3].id, correct: false, text: "Я тебя знаю" },
      { challengeId: c8s[4].id, correct: true, text: "Bilmiyorum" }, { challengeId: c8s[4].id, correct: false, text: "Anlıyorum" }, { challengeId: c8s[4].id, correct: false, text: "Yazıyorum" }, { challengeId: c8s[4].id, correct: false, text: "Okuyorum" },
    ]);

    // U2L5: Sentez - Profesyonel Günlük Hayat
    const u2l5 = await db.insert(schema.lessons).values({ unitId: unit2[0].id, title: "Edebiyatçı Sentezi: Günlük Hayat", order: 5 }).returning();
    const cS2s = await db.insert(schema.challenges).values([
      { lessonId: u2l5[0].id, type: "ASSIST", question: '"İş yerindeyim, yazıyorum" nasıl denir?', order: 1 },
      { lessonId: u2l5[0].id, type: "SELECT", question: 'Birine nezaketle "Neredesin?" diye sor.', order: 2 },
      { lessonId: u2l5[0].id, type: "ASSIST", question: '"Affedersiniz, ne zaman?" nasıl denir?', order: 3 },
      { lessonId: u2l5[0].id, type: "SELECT", question: '"Teşekkürler, biliyorum" cümlesini kur.', order: 4 },
      { lessonId: u2l5[0].id, type: "ASSIST", question: '"Seni seviyorum, hoşça kal" nasıl denir?', order: 5 },
    ]).returning();
    await db.insert(schema.challengeOptions).values([
      { challengeId: cS2s[0].id, correct: true, text: "Я на работе, я пишу" }, { challengeId: cS2s[0].id, correct: false, text: "Я дома, я ем" }, { challengeId: cS2s[0].id, correct: false, text: "Я в школе, я читаю" }, { challengeId: cS2s[0].id, correct: false, text: "Гde rabota?" },
      { challengeId: cS2s[1].id, correct: true, text: "Извините, где ты?" }, { challengeId: cS2s[1].id, correct: false, text: "Кто ты?" }, { challengeId: cS2s[1].id, correct: false, text: "Что это?" }, { challengeId: cS2s[1].id, correct: false, text: "Я не знаю" },
      { challengeId: cS2s[2].id, correct: true, text: "Извините, когда?" }, { challengeId: cS2s[2].id, correct: false, text: "Спасибо, где?" }, { challengeId: cS2s[2].id, correct: false, text: "Пожалуйста, что?" }, { challengeId: cS2s[2].id, correct: false, text: "Привет, как?" },
      { challengeId: cS2s[3].id, correct: true, text: "Спасибо, я знаю" }, { challengeId: cS2s[3].id, correct: false, text: "Да, я не знаю" }, { challengeId: cS2s[3].id, correct: false, text: "Кто я?" }, { challengeId: cS2s[3].id, correct: false, text: "Я дома" },
      { challengeId: cS2s[4].id, correct: true, text: "Я тебя люблю, пока" }, { challengeId: cS2s[4].id, correct: false, text: "Я не знаю, привет" }, { challengeId: cS2s[4].id, correct: false, text: "Где ты, привет" }, { challengeId: cS2s[4].id, correct: false, text: "Кто это, пока" },
    ]);

    console.log("Database seeded successfully with DEFINITIVE 50 Questions!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
