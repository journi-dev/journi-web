import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      "en-US": {
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
          goodMorning: "Good morning",
          goodAfternoon: "Good afternoon",
          goodEvening: "Good evening",
          notifications: "Notifications",
          myAccount: "My account",
          // Updates
          new: "New",
          nothingHereYet: "Nothing here yet!",
          blockoutDate: "Blockout date(s)",
          error: "Error",
          // Announcements
          newAnnouncement: "New Announcement",
          announcementName: "Announcement Name",
          announcementDesc: "Description",
          addPhotos: "Add photos",
          addPhotosDesc: "Click here or drag photos to upload.",
          // Blockout Date(s)
          newBlockoutDate: "New Blockout Date(s)",
          // Promotions
          newPromo: "New Promotion",
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
          resources: "Resources",
          "about us": "About us",
          company: "Company",
          logIn: "Log in",
          signUp: "Sign up",
          getStarted: "Get started",
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
          goodMorning: "Buenos días",
          goodAfternoon: "Buenas tardes",
          goodEvening: "Buenas noches",
          notifications: "Notificaciones",
          myAccount: "Mi cuenta",
          // Updates
          new: "Nuevo",
          nothingHereYet: "¡Nada aquí todavía!",
          blockoutDate: "Fecha bloqueada(s)",
          error: "Error",
          // Announcements
          newAnnouncement: "Nueva Anuncio",
          announcementName: "Nombre del anuncio",
          announcementDesc: "Descripción",
          addPhotos: "Agregar fotos",
          addPhotosDesc: "Haga clic aquí o arrastre las fotos para cargarlas.",
          // Blockout Date(s)
          newBlockoutDate: "Nueva Becha Bloqueada(s)",
          // Promotions
          newPromo: "Nueva Promocional",
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
          resources: "Recursos",
          "about us": "Sobre nosotros",
          company: "Compañía",
          logIn: "Acceso",
          signUp: "Inscribirse",
          getStarted: "Comencemos",
          demo: "Manifestación",
        },
      },
    },
  });

export default i18next;
