//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

import { InfAnterioresBlockTxt, InfAnterioresHeader, InfAnterioresPost } from "../../components/intAnteriores"



export const InformesAnteriores = () => {


    return (
        <div>
            <div>
        <div>
            <br/>
            <br/>
            <InfAnterioresHeader/>
            <br/>
            <hr />
            <br/>
            <InfAnterioresBlockTxt />
            <br/>
            <hr />
            <br/>
            <InfAnterioresPost />
            <br/>
            <hr />
            <br/>
            {/* <HomeArticles /> */}
            <br/>
            <br/>
        </div>
    </div>
        </div>
    )
}
