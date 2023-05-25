//IMPORTS DE REACT:
import { useEffect, useState } from 'react';
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
//IMPORTS COMPONENTS DE LA APP:
import { UserItem } from '../UserItem';
//IMPORTS Styles/Images DE LA APP:
 
 
const userController = new User();

export const ListUsers = ( props ) => {
    //obtenemos las props:
    const { usersActive, reload, onReload } = props;

    const { accessToken } = useAuth();

    //Creamos el state:
    const [ users, setUsers ] = useState(null);

    useEffect(() => {
        (async () => {

            try {
                setUsers(null);
                const response = await userController.getUsers(accessToken, usersActive);
                setUsers(response)

            } catch (error) {
                console.error(error);
            }
            
        })()
    }, [ usersActive, reload ]);

    //Loading:
    if(!users) return <Loader active inline="centered"/>
    if(size(users) === 0) return 'No hay ningun usuario';

    
    return map(users, (user) => (
        <UserItem key={user._id} user={user} onReload={onReload} />
    ));
}