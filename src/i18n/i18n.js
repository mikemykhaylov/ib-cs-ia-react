import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        BARBERS: 'BARBERS',
        SERVICES: 'SERVICES',
        LOCATIONS: 'LOCATIONS',
        CAREERS: 'CAREERS',
        Haircut: 'Haircut',
        'Beard trim': 'Beard trim',
        'Combo (hair + beard)': 'Combo \n (hair + beard)',
        Reserve: 'Reserve',
        Advantages: 'Advantages',
        'We could not fit all of them here': 'We could not fit all of them here',
        'Professional barbers': 'Professional barbers',
        'Barbers who will change your hairstyle and yourself':
          'Barbers who will change your hairstyle and yourself',
        'Best equipment': 'Best equipment',
        'We use cosmetics and tools that are known all over the world':
          'We use cosmetics and tools that are known all over the world',
        'Suitable location': 'Suitable location',
        'We are in the heart of Warsaw, next to the Royal Łazienki Park':
          'We are in the heart of Warsaw, next to the Royal Łazienki Park',
        'Who are we?': 'Who are we?',
        'Traditions combined with innovation': 'Traditions combined with innovation',
        'People with a passion for barbering and Polish history':
          'People with a passion for barbering and Polish history',
        // "More": "More",
        Gallery: 'Gallery',
        'A place to fall in love with': 'A place to fall in love with',
        Location: 'Location',
        'We are waiting for you': 'We are waiting for you',
        'Get in touch': 'Get in touch',
        'Our adress': 'Our adress',
        Phone: 'Phone',
        'Working hours': 'Working hours',
        Services: 'Services',
        'Junior haircut (10 years)': 'Junior haircut (10 years)',
        'Father + son': 'Father + son',
        'Elderly haircut 65+': 'Elderly haircut 65+',
      },
    },
    pl: {
      translations: {
        BARBERS: 'BARBERY',
        SERVICES: 'USŁUGI',
        LOCATIONS: 'LOKALIZACJE',
        CAREERS: 'KARIERA',
        Haircut: 'Strzyżenie włosów',
        'Beard trim': 'Trymowanie brody',
        'Combo (hair + beard)': 'Combo (włosy + broda)',
        Reserve: 'Rezerwacja',
        Advantages: 'Zalety',
        'We could not fit all of them here': 'Nie mogliśmy zmieścić ich wszystkich tutaj',
        'Professional barbers': 'Profesjonalni barberzy',
        'Barbers who will change your hairstyle and yourself':
          'Barberzy, którzy zmienią twoją fryzurę, a z nią właśnie ciebie',
        'Best equipment': 'Najlepszy sprzęt',
        'We use cosmetics and tools that are known all over the world':
          'Używamy kosmetyków i narzędzi, które są znane na całym świecie',
        'Suitable location': 'Przyzwoita lokalizacja',
        'We are in the heart of Warsaw, next to the Royal Łazienki Park':
          'Jesteśmy w samym sercu Warszawy, tuż przy Łazienkach Królewskich',
        'Who are we?': 'Kim jesteśmy?',
        'Traditions combined with innovation': 'Tradycje w połączeniu z innowacją',
        'People with a passion for barbering and Polish history':
          'Ludzie z pasją do barberingu i polskiej historii',
        // "More": "Więcej",
        Gallery: 'Galeria',
        'A place to fall in love with': 'Miejsce, w którym można się zakochać',
        Location: 'Lokalizacja',
        'We are waiting for you': 'Czekamy na Ciebie',
        'Get in touch': 'Skontaktuj się z nami',
        'Our adress': 'Nasz adres',
        Phone: 'Telefon',
        'Working hours': 'Godziny pracy',
        Services: 'Usługi',
        'Junior haircut (10 years)': 'Strzyżenie chlopca (10 lat)',
        'Father + son': 'Ojciec + syn',
        'Elderly haircut 65+': 'Strzyżenie seniora 65+',
      },
    },
  },
  fallbackLng: 'pl',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
