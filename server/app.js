const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

//IMPORT ROUTING:
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
//NAVBAR ROUTING:
const menuRouter = require('./router/navBar/menu');
//FOOTER ROUTING:
const socialRouter = require('./router/footer/social');
const footerLinksMenuRouter = require('./router/footer/footerLinksMenu');
const footerLogoRouter = require('./router/footer/footerLogo');
const footerTxtRouter = require('./router/footer/footerTxt');
//HOME ROUTING:
const homeHeaderRouter = require('./router/home/homeHeader');
const homeHeaderBoxRouter = require('./router/home/homeHeaderBox');
const homeHeaderAncorsRouter = require('./router/home/homeHeaderAncor');
const homeArticleRouter = require('./router/home/homeArticle');
//INT SOBRE OBSERVATORIO ROUTING:
const intSobreHeaderRouter = require('./router/intSobre/intSobreHeader');
const intSobreBlockTxtRouter = require('./router/intSobre/intSobreBlockTxt');
const ObserContentRouter = require('./router/intSobre/obserContent');
//INT ESTUDIOS ANTERIORES ROUTING:
const infAnterioresHeaderRouter = require('./router/infAnteriores/infAnterioresHeader');
const infAnterioresTxtRouter = require('./router/infAnteriores/infAnterioresTxt');
const infAntPostRouter = require('./router/infAnteriores/infAntPost');
//PDFS:
const pdfRouter = require('./router/pdf')


 

//Configure body Parse:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configures Static Folder:
app.use(express.static('uploads'));

//Configure Header HTTP - Cors:
app.use(cors());

//Configure ROUTING:
app.use(`/api/${API_VERSION}`, authRouter); 
app.use(`/api/${API_VERSION}`, userRouter);
//Configure NAV ROUTING:
app.use(`/api/${API_VERSION}`, menuRouter);
//Configure FOOTER ROUTING:
app.use(`/api/${API_VERSION}`, socialRouter);
app.use(`/api/${API_VERSION}`, footerLinksMenuRouter);
app.use(`/api/${API_VERSION}`, footerLogoRouter);
app.use(`/api/${API_VERSION}`, footerTxtRouter);
//Configure HOME ROUTING:
app.use(`/api/${API_VERSION}`, homeHeaderRouter);
app.use(`/api/${API_VERSION}`, homeHeaderBoxRouter);
app.use(`/api/${API_VERSION}`, homeHeaderAncorsRouter);
app.use(`/api/${API_VERSION}`, homeArticleRouter);
//Configure SOBRE OBSERVATORIO ROUTING:
app.use(`/api/${API_VERSION}`, intSobreHeaderRouter);
app.use(`/api/${API_VERSION}`, intSobreBlockTxtRouter);
app.use(`/api/${API_VERSION}`, ObserContentRouter);
//Configure ESTUDIOS ANTERIORES ROUTING:
app.use(`/api/${API_VERSION}`, infAnterioresHeaderRouter);
app.use(`/api/${API_VERSION}`, infAnterioresTxtRouter);
app.use(`/api/${API_VERSION}`, infAntPostRouter);
//Pdf:
app.use(`/api/${API_VERSION}`, pdfRouter);

module.exports = app;