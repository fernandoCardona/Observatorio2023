//IMPORTS DE REACT: 
//IMPORTS DEPENDENCIAS DE TERCEROS: 
import { BrowserRouter } from 'react-router-dom';

//IMPORTS DEPENDENCIAS DE LA APP: 
//IMPORTS COMPONENTS DE LA APP: 
import { AdminRouter } from './router/AdminRouter'; 
import { AuthProvider } from './context'; 
//IMPORTS Styles/Images DE LA APP: 
//import 'semantic-ui-css/semantic.min.css';
import "./SCSS/global.scss";


const App = () => {

    return (
      <AuthProvider>
          <BrowserRouter>
              <AdminRouter/>
        </BrowserRouter>
      </AuthProvider>
      
    )
}

export default App


