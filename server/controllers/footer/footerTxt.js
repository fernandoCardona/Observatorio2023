//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const FooterTxt = require('../../models/footer/footerTxt');

const createFooterTxt = async( req, res ) => {
    const footerTxt = new FooterTxt(req.body);

    footerTxt.save(( error, footerTxtStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo footerTxt' });
        }else {
            res.status(201).send({
                msg: 'FooterTxt creado correctamente',
                footerTxtStorage
            })
        }
    })
};

const getFooterTxts = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los FooterTxt de forma ordenada:
        response = await FooterTxt.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los FooterTxts activos:
        response = await FooterTxt.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener FooterTxts' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateFooterTxt = async( req, res ) => {
    const {id} = req.params;
    const footerTxtData = req.body;

    FooterTxt.findByIdAndUpdate( {_id:id }, footerTxtData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el FooterTxt' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del FooterTxt con exito' });
        }
    });
}

const deleteFooterTxt = async( req, res ) => {
    const { id } = req.params;
    FooterTxt.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el FooterTxt' });
        }else {
            res.status(200).send({ msg: 'Social borrado con FooterTxt' });
        }
        
    });

}

module.exports = {
    createFooterTxt,
    getFooterTxts,
    updateFooterTxt,
    deleteFooterTxt
};