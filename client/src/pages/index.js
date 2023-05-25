//IMPORTS DE REACT/NEXT:
import Head from 'next/head'
import { Inter } from 'next/font/google'
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button } from 'semantic-ui-react'
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
//import styles from "./---.module.scss";


const inter = Inter({ subsets: ['latin'] })

import React from 'react'

const Index = () => {


    return (
      <div>
          <h1>Index</h1>
          <div>
            <Button primary>Ir al Login</Button>
           
          </div>
          <a href="#">lo que sea pero ya</a>
      </div>
    )
}

export default Index
