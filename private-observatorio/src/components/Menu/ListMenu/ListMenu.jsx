//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Menu } from "../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { MenuItem } from "../MenuItem";
//IMPORTS Styles DE LA APP:

const menuController = new Menu();

export const ListMenu = (props) => {
    //Obtenemos las props
    const { active, reload, onReload } = props;
    const [menus, setMenus] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    setMenus(null);
                    const response = await menuController.getMenu(active);
                    setMenus(response);
                } catch (error) {
                    console.log(error);
                }
            }
        )();
    }, [active, reload]);

    if (!menus) return <Loader active inline="centered" />;
    if (size(menus) === 0) return "No hay ningun menu";

    return map( menus, (menu) =><MenuItem key={menu._id} menu={menu} onReload={ onReload}/>)
}