const SERVER_IP = 'localhost:4000';
export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: 'auth/register',
        LOGIN: 'auth/login',
        //User endPoins:
        USER_ME: 'user/me',
        REFRESH_ACCESS_TOKEN: 'auth/refresh_access_token',
        USER: 'user',
        USERS: 'users',
        //MENU endPoins:
        MENU: 'menu',
        //SOCIAL endPoins:
        SOCIAL: 'social',
        //FOOTER endPoins:
        FOOTERLOGO: 'footerLogo',
        FOOTERLINKS:'footerLinksMenu',
        FOOTERTXT:'footerTxt',
        //HOME endPoins:
        HOMEHEADER: 'homeHeader',
        HOMEHEADERBOX: 'homeHeaderBox',
        HOMEHEADERANCORS: 'homeHeaderAncors',
        HOMEHEADERANCOR: 'homeHeaderAncor',
        HOMEARTICLES: 'homeArticles',
        HOMEARTICLE: 'homeArticle',
        //SOBREINFORME endPoins:
        SOBREINFORMEHEADER: 'intSobreHeader',
        SOBREINFORMEBLOCKTXT: 'intSobreBlockTxt',
        OBSERVATORIOCONTENT:'observatorioContent',
        //INFORMES ANTERIORES endPoins:
        ANTERIORESHEADER:'infAnterioresHeader',
        ANTERIORESBLOCKTXT:'infAntBlockTxt',
        ANTERIORESPOST: 'infAntPost',
        //PDFS endPoins:
        PDF: 'pdf',
        
    }, 
    JWT: {
        ACCESS: 'access',
        REFRESH: 'refresh'
    }
}