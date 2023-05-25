//IMPORTS DE REACT:
const fs = require('fs');
//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const image = require('../../utils/image');
const Menu = require('../../models/navBar/menu');

const createMenu = async( req, res ) => {
    const menu = new Menu(req.body);
 
    //Controlamos imagen de avatar:
    if (req.files.navImage1) { 
        const imagePath1 = image.getFilePath(req.files.navImage1);
        menu.navImage1 = imagePath1;
    }
    if (req.files.navImage2) {
        const imagePath2 = image.getFilePath(req.files.navImage2);
        menu.navImage2 = imagePath2;
    }

    menu.save(( error, menuStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo menu' });
        }else {
            res.status(201).send({
                msg: 'Menu creado correctamente',
                menuStorage
            })
        }
    })
};

const getMenus = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los Menus de forma ordenada:
        response = await Menu.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los Menuss activos:
        response = await Menu.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener menus' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateMenu = async( req, res ) => {
    const {id} = req.params;
    const menuData = req.body;
 

    const newNavIamge1 = req.files.navImage1;
    const newNavIamge2 = req.files.navImage2;
    //await deleteImagePath(id, newNavIamge1, newNavIamge2);

    //Controlamos imagenes :
     if (req.files.navImage1) {
        await deleteImagePath(id, newNavIamge1);
         const imagePath1 = image.getFilePath(req.files.navImage1);
         menuData.navImage1 = imagePath1;
     }
     if (req.files.navImage2) {
        await deleteImagePath(id, newNavIamge2);
         const imagePath2 = image.getFilePath(req.files.navImage2);
         menuData.navImage2 = imagePath2;
     }


    Menu.findByIdAndUpdate( {_id:id }, menuData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el menu' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del menu con exito' });
        }
    });
}

const deleteMenu = async( req, res ) => {
    const { id } = req.params;

    await deleteImagePath(id);

    Menu.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el menu' });
        }else {
            res.status(200).send({ msg: 'Menu borrado con exito' });
        }
        
    });

}
const deleteImagePath = async (id, newNavIamge1, newNavIamge2) => {console.log('Post',id)
    try {
        const MenuStored = await Menu.findById(id);
        if (!MenuStored) {
            throw new Error('No se ha encontrado Menu.');
        }
         
        // console.log('MenuStored.navImage1',MenuStored.navImage1)
        // console.log('MenuStored.navImage2',MenuStored.navImage2)
        // console.log('newNavIamge1',newNavIamge1)
        // console.log('newNavIamge2',newNavIamge2)
         if (MenuStored.navImage1 ){
             const imagePath = MenuStored.navImage1;
             //console.log('IMAGEPATH', imagePath);
             fs.unlink(`uploads/${imagePath}`, (error) => {
                 if (error) {
                     console.log('Error al borrar el archivo:', error);
                 } else {
                     console.log('El archivo ha sido borrado correctamente.'); 
                 }
             });
         }
         
         if (MenuStored.navImage2 ){
             const imagePath = MenuStored.navImage2;
             //console.log('IMAGEPATH', imagePath);
            fs.unlink(`uploads/${imagePath}`, (error) => {
                 if (error) {
                     console.log('Error al borrar el archivo:', error);
                 } else {
                     console.log('El archivo ha sido borrado correctamente.'); 
                 }
             });
         }
        
    } catch (error) {
        console.log('Error al borrar el archivo:', error);
    }
};
module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
};