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
          announcement: "Announcement",
          announcements: "Announcements",
          updates: "Updates",
          promotion: "Promotion",
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
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday",
          jan: "January",
          feb: "February",
          mar: "March",
          apr: "April",
          may: "May",
          jun: "June",
          jul: "July",
          aug: "August",
          sep: "September",
          oct: "October",
          nov: "November",
          dec: "December",
          2022: ", 2022",
          2023: ", 2023",
          2024: ", 2024",
          2025: ", 2025",
          2026: ", 2026",
          2027: ", 2027",
          2028: ", 2028",
          2029: ", 2029",
          2030: ", 2030",
          goodMorning: "Good morning",
          goodAfternoon: "Good afternoon",
          goodEvening: "Good evening",
          notifications: "Notifications",
          myAccount: "My account",
          // Updates
          new: "New",
          nothingHereYet: "Nothing here yet!",
          // Promotions
          newPromo: "New Promo",
          promoName: "Promo Name",
          promoCode: "Promo Code",
          promoDesc: "Description",
          update: "Update",
          copyPromoCode: "Copy promo code",
          duplicate: "Duplicate",
          delete: "Delete",
          // Welcome
          products: "Products",
          pricing: "Pricing",
          "about us": "About us",
          logIn: "Log in",
          signUp: "Sign up",
          demo: "Demo",
        },
      },
      es: {
        translation: {
          // AppBar
          home: "Panel",
          announcement: "Anuncio",
          announcements: "Anuncios",
          updates: "Actualizaciones",
          promotion: "Promoción",
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
          sun: "Domingo",
          mon: "Lunes",
          tue: "Martes",
          wed: "Miércoles",
          thu: "Jueves",
          fri: "Viernes",
          sat: "Sábado",
          jan: "enero",
          feb: "febrero",
          mar: "marzo",
          apr: "abril",
          may: "mayo",
          jun: "junio",
          jul: "julio",
          aug: "agosto",
          sep: "septiembre",
          oct: "octubre",
          nov: "noviembre",
          dec: "deciembre",
          2022: "de 2022",
          2023: "de 2023",
          2024: "de 2024",
          2025: "de 2025",
          2026: "de 2026",
          2027: "de 2027",
          2028: "de 2028",
          2029: "de 2029",
          2030: "de 2030",
          goodMorning: "Buenos días",
          goodAfternoon: "Buenas tardes",
          goodEvening: "Buenas noches",
          notifications: "Notificaciones",
          myAccount: "Mi cuenta",
          // Updates
          new: "Nuevo",
          nothingHereYet: "¡Nada aquí todavía!",
          // Promotions
          newPromo: "Nueva Promo",
          promoName: "Nombre Promocional",
          promoCode: "Código Promocional",
          promoDesc: "Descripción",
          update: "Actualizar",
          copyPromoCode: "Copiar código promocional",
          duplicate: "Duplicar",
          delete: "Eliminar",
          // Welcome
          products: "Productos",
          pricing: "Precios",
          "about us": "Sobre nosotros",
          logIn: "Acceso",
          signUp: "Inscribirse",
          demo: "Manifestación",
        },
      },
    },
  });

export default i18next;
