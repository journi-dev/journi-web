import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // AppBar
          home: "Home",
          announcements: "Announcements",
          updates: "Updates",
          promotions: "Promotions",
          analytics: "Analytics",
          social: "Social",
          support: "Support",
          settings: "Settings",
          logOut: "Log Out",
          // Footer
          termsOfService: "Terms of Service",
          privacyPolicy: "Privacy Policy",
          reportABug: "Report a bug",
          language: "Language",
          english: "English",
          spanish: "Spanish",
          appearance: "Appearance",
          light: "Light",
          dark: "Dark",
          system: "System",
          with: "with",
          // Toolbar
          goodMorning: "Good morning",
          goodAfternoon: "Good afternoon",
          goodEvening: "Good evening",
          notifications: "Notifications",
          myAccount: "My account",
          // Promotions
          newPromo: "New Promo",
          promoName: "Promo Name",
          promoCode: "Promo Code",
          promoDesc: "Description",
        },
      },
      es: {
        translation: {
          // AppBar
          home: "Panel",
          announcements: "Anuncios",
          updates: "Actualizaciones",
          promotions: "Promociones",
          analytics: "Analítica",
          social: "Social",
          support: "Apoyo",
          settings: "Configuración",
          logOut: "Cerrar sesión",
          // Footer
          termsOfService: "Términos de servicio",
          privacyPolicy: "Política de privacidad",
          reportABug: "Reportar un error",
          language: "Idioma",
          english: "Inglés",
          spanish: "Español",
          appearance: "Apariencia",
          light: "Ligero",
          dark: "Oscuro",
          system: "Sistema",
          with: "con",
          // Toolbar
          goodMorning: "Buenos días",
          goodAfternoon: "Buenas tardes",
          goodEvening: "Buenas noches",
          notifications: "Notificaciones",
          myAccount: "Mi cuenta",
          // Promotions
          newPromo: "Nueva Promo",
          promoName: "Nombre Promocional",
          promoCode: "Código Promocional",
          promoDesc: "Descripción",
        },
      },
    },
  });

export default i18next;
