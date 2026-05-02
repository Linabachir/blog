function goHome() {
  window.location.href = "/";
}

const translations = {
  en: {
    title: "My Travel Blog",
    latest: "Latest Destinations"
  },
  fr: {
    title: "Mon Blog Voyage",
    latest: "Mes Dernières Destinations"
  }
};

document.getElementById("lang-switch").addEventListener("change", function() {
  const lang = this.value;

  document.getElementById("title").textContent = translations[lang].title;
  document.getElementById("latest").textContent = translations[lang].latest;
});