//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../components/Shared";
//IMPORTS COMPONENTS DE LA APP:
import { HomeHeader } from "../../components/Home/HomeHeader";
import { HomeHeaderAncors } from "../../components/Home/HomeHeaderAncors/HomeHeaderAncors";
import { HomeHeaderBox } from "../../components/Home/HomeHeaderBox/HomeHeaderBox.jsx";
import { HomeArticles } from "../../components/Home/HomeArticles";
//IMPORTS Styles/Images DE LA APP:



export const Home = () => {
  return (
    <div>
        <br/>
        <br/>
        <HomeHeader/>
        <br/>
        <hr />
        <br/>
        <HomeHeaderAncors/>
        <br/>
        <hr />
        <br/>
        <HomeHeaderBox />
        <br/>
        <hr />
        <br/>
        <HomeArticles />
        <br/>
        <br/>
    </div>
  )
}
