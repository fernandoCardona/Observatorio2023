//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const FooterLink = require('../../models/footer/footerLink');

const createFooterLink = async( req, res ) => {
    const { title, path, order, active } = req.body;
    const footerLink = new FooterLink({
        title,
        path,
        order,
        active
    });

    footerLink.save(( error, footerLinkStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo footerLink' });
        }else {
            res.status(201).send({
                msg: 'footerLink creado correctamente',
                footerLinkStorage
            })
        }
    })
};

const getFooterLinks = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los FooterLink de forma ordenada:
        response = await FooterLink.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los FooterLinkactivos:
        response = await FooterLink.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener FooterLinks' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateFooterLink = async( req, res ) => {
    const {id} = req.params;
    const footerLinkData = req.body;

    FooterLink.findByIdAndUpdate( {_id:id }, footerLinkData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el footerLink' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del footerLink con exito' });
        }
    });
}

const deleteFooterLink = async( req, res ) => {
    const { id } = req.params;
    FooterLink.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el footerLink' });
        }else {
            res.status(200).send({ msg: 'FooterLink borrado con exito' });
        }
        
    });

}

module.exports = {
    createFooterLink,
    getFooterLinks,
    updateFooterLink,
    deleteFooterLink
};