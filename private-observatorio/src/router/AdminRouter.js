//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Routes, Route } from 'react-router-dom';
//IMPORTS DEPENDENCIAS DE LA APP:
import { map } from 'lodash';
//IMPORTS COMPONENTS DE LA APP:
import { AdminLayout } from '../layouts/AdminLayout';
import { Auth, Navbar, Footer, Home, Users, SobreInforme, InformesAnteriores, pdfs, Emails} from '../pages';
import { useAuth } from '../hooks/useAuth';
//IMPORTS Styles/Images DE LA APP:

const user = null;

export const AdminRouter = () => {
    const { user } = useAuth();
    
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page/>
            </Layout>
        )
    }
 
    return (
       <Routes>
            {
                !user ? (
                    <Route path='/admin/*' element={ <Auth /> }/>
                )
                : (
                    <>
                        {/* {
                            ['/admin', '/admin/users'].map( (path) => (
                                <Route key={path} path={path} element={ loadLayout( AdminLayout, Home ) }/>
                            ))
                        } */}
                        
                        <Route path='/admin/users' element={ loadLayout( AdminLayout, Users ) }/>
                        <Route path='/admin/navbar' element={ loadLayout( AdminLayout, Navbar ) }/>
                        <Route path='/admin/footer' element={ loadLayout( AdminLayout, Footer ) }/>
                        <Route path='/admin/users' element={ loadLayout( AdminLayout, Users ) }/>
                        <Route path='/admin/home' element={ loadLayout( AdminLayout, Home ) }/>
                        <Route path='/admin/sobreInforme' element={ loadLayout( AdminLayout, SobreInforme ) }/>
                        <Route path='/admin/informesAnteriores' element={ loadLayout( AdminLayout, InformesAnteriores ) }/>
                        <Route path='/admin/pdfs' element={ loadLayout( AdminLayout, pdfs ) }/>
                        <Route path='/admin/emails' element={ loadLayout( AdminLayout, Emails ) }/>
                    </>
                    
                )
            }
            
            
            
       </Routes>
    )
}
