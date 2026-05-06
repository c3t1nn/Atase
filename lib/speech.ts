/**
 * Ataşe Ses Motoru
 * Tarayıcının yerleşik SpeechSynthesis API'sini kullanarak metinleri seslendirir.
 */
export const speak = (text: string) => {
  if (typeof window === "undefined") return;

  // Sadece Rusça (Kiril) karakterleri, boşlukları ve temel noktalama işaretlerini ayıkla
  // Türkçe karakterleri ve diğerlerini filtrele
  const russianPart = text.match(/[а-яА-ЯёЁ\s\d.,!?-]+/g)?.join(" ").trim();

  if (!russianPart || !/[а-яА-ЯёЁ]/.test(russianPart)) return;

  // Önce çalan diğer sesleri durdur
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(russianPart);
  
  utterance.lang = "ru-RU";
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};
