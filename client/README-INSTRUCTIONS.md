## Client Dependencies List:

- yarn add semantic-ui-react semantic-ui-css
- yarn add sass
- yarn add formik yup
- yarn add dotenv (example: {Bucket: process.env.S3_BUCKET})
- yarn add classnames ( condicionar clases )
- yarn add lodash
- yarn add luxon ( formateo de fechas )
- yarn add react-player ( reder videos in components)
- yarn add react-slick (carousell de imagenes )
- yarn add slick-carousel
  ## add This urls to src/pages/\_app.js:
  - import "slick-carousel/slick/slick.css";
  - import "slick-carousel/slick/slick-theme.css";

## COMPONENT HEADER:

//IMPORTS DE REACT/NEXT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import styles from "./---.module.scss";

## COMPONENT Seo:

import { Seo } from "@/components/Shared";
<Seo title='Log-in Gaming platform'/>
