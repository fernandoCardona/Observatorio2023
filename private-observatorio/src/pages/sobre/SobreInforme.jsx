//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { BasicModal } from "../../components/Shared";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { SobreInformeHeader } from "../../components/SobreInforme/SobreInformeHeader/SobreInformeHeader";
import { SobreInformeBlockTxt } from "../../components/SobreInforme/SobreInformeBlockTxt/SobreInformeBlockTxt";
import { SobreInformeContent } from "../../components/SobreInforme/SobreInformeContent/SobreInformeContent";
//IMPORTS Styles/Images DE LA APP:


export const SobreInforme = () => {
  return (
    <div>
        <div>
            <br/>
            <br/>
            <SobreInformeHeader/>
            <br/>
            <hr />
            <br/>
            <SobreInformeBlockTxt />
            <br/>
            <hr />
            <br/>
            <SobreInformeContent />
            <br/>
            <hr />
            <br/>
            {/* <HomeArticles /> */}
            <br/>
            <br/>
        </div>
    </div>
  )
}
