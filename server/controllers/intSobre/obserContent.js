//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const image = require('../../utils/image');
const ObservatorioContent = require('../../models/intSobre/observatorioContent');


const getObservatorioContent = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los IntSobreBlockTxt de forma ordenada:
        response = await ObservatorioContent.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los IntSobreBlockTxt activos:
        response = await ObservatorioContent.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener ObservatorioContent' });
    } else{
        res.status(200).send(response);
    }
    
}

const createObservatorioContent = async( req, res ) => {
    const observatorioContent = new ObservatorioContent(req.body);
console.log(req.body)
    observatorioContent.save(( error, observatorioContentStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo ObservatorioContent' });
        }else {
            res.status(201).send({
                msg: 'ObservatorioContent creado correctamente',
                observatorioContentStorage
            })
        }
    })
};

const updateObservatorioContent = async( req, res ) => {
    const {id} = req.params;
    const observatorioContentData = req.body;
console.log(observatorioContentData)
    
    ObservatorioContent.findByIdAndUpdate( {_id:id }, observatorioContentData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el ObservatorioContent' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del ObservatorioContent con exito' });
        }
    });
}

const deleteObservatorioContent = async( req, res ) => {
    const { id } = req.params;
    ObservatorioContent.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el ObservatorioContent' });
        }else {
            res.status(200).send({ msg: 'ObservatorioContent borrado con exito' });
        }
        
    });

}

module.exports = {
    createObservatorioContent,
    getObservatorioContent,
    updateObservatorioContent,
    deleteObservatorioContent
};