export const fakeApiTimeout = 2000;
export const ___PW = 'us--exp';

export const divider = '-';
export const splitter = '@';








// ========================================================### DEVICE BREAKPOINTS ###
export const devicesBreakpoints = {
  mobile: 992,
  tablet: 1030,
  laptop: 1380,
  desktop: 2000,
  retina: 9999
};
export const devices = {
  inStore: '__SIZE_DATA__'
};

// ========================================================### BASIC ANIMATION PARAMETERS ###
// default duration for whole animations
export const dur = .3;
export const minDur = .15;
export const midDur = .5;
export const bigDur = .65;

// easing configurations in function
// for server-side render reasons
export const ease = {
  in: () => Cubic.easeIn,
  out: () => Cubic.easeOut,
  inOut: () => Cubic.easeInOut,
  easeNone: () => Linear.easeNone
};


// ========================================================### INTRO SLIDER CONFIG ###
export const introSlider = {
  // remember that animationDuration will be multiplied by 2,
  // because we have to hide and show slide.
  animationDuration: .9,
  get slidesDuration() {
    return 10 + (this.animationDuration * 2)
  },

  elementsGap: 300,
  contentGap: 100,

  easeIn: ease.in,
  easeOut: ease.out
};

// ========================================================### NAVIGATION CONFIG ###
export const navigation = {
  overlayOpacity: .85,
  duration: dur,
  ease: ease.out,
  gap: 30
};


// ========================================================### MOBILE NAVIGATION CONFIG ###
const navMobileDuration = bigDur;
const navMobileWrapperDelay = navMobileDuration / 3;
export const navMobile = {
  duration: navMobileDuration,
  contentGap: '30%',
  menuWrapperGap: '70%',
  menuWrapperEase: ease.out,
  menuWrapperDelay: navMobileWrapperDelay,
  menuWrapperDuration: (navMobileDuration - navMobileWrapperDelay),
  menuGap: '-100%',
  easeIn: ease.inOut,
  easeOut: ease.out
};


// ========================================================### CART CONFIG ###
export const cart = {
  duration: bigDur,
  easeIn: ease.inOut,
  easeOut: ease.out,

  inStore: '__CART_DATA__'
};

// ========================================================### PRELOADER CONFIG ###
export const preloader = {
  spinDuration: bigDur,
  fadeDuration: dur,
  easeIn: ease.inOut,
  easeOut: ease.out,
  easeSpin: ease.inOut
};

// ========================================================### IMAGE COMPONENT CONFIG ###
export const image = {
  dur: bigDur,
  ease: ease.out,
  delay: 0.1,
  blur_radius: 20
};


// AboutPage Header & ContactPage Header config
export const MobileHeaderRatio = .4;
export const DesktopHeaderRatio = .2;


// ========================================================### TITLES OF PAGES ###
export const pagesTitles = {
  TodosPage: 'Todos',
  InfoPage: 'Application Info',
  BoardPage: 'The Board',
  LoginPage: 'Login',
  SignupPage: 'Sign Up',
  UserPage: 'You',

  ProtectPage: 'Гарантии',
  DeliveryPage: 'Доставка и оплата',
  ContactPage: 'Контакты',
  CatalogPage: 'Каталог гаджетов',
  AdminPage: 'Панель администратора'
};

// ========================================================### USER CONFIG ###
export const user = {
  nameMaxLength: 20
};

// ========================================================### MAP CONFIG ###
export const map = {
  //apiKey: "AIzaSyDfRCp7Rg_ufXZqgFBOsNP8ICY9LnPE1oI",
  apiKey: 'AIzaSyCzIFSJwXc8KfxmERx6-ut9FMnzN2owdW4',
  url: 'https://maps.googleapis.com/maps/api/js?key=',
  loadingParams: 'libraries=places',
  yandexMap: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&modules=metro',
  get link() {
    return this.url + this.apiKey + (this.loadingParams ? '&' + this.loadingParams : '')
  },
  scriptId: 'map-script',

  options: {
    center: [59.92517, 30.32243900000003],
    zoom: 12,
    scrollwheel: true,
    zoomControl: true,
    scaleControl: true,
    streetViewControl: true,
    fullscreenControl: true
  },

  onSetPointZoom: 16,

  points: []
};




