//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:

const HomeHeaderAncor = require('../../models/home/homeHeaderAncor');

const createHomeHeaderAncor = async( req, res ) => {
    const homeHeaderAncor = new HomeHeaderAncor(req.body);
console.log(req.body)
    homeHeaderAncor.save(( error, homeHeaderAncorStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo homeHeaderAncor' });
        }else {
            res.status(201).send({
                msg: 'HomeHeaderAncor creado correctamente',
                homeHeaderAncorStorage
            })
        }
    })
};

const getHomeHeaderAncors = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los HomeHeaderBox de forma ordenada:
        response = await HomeHeaderAncor.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los HomeHeaderBox activos:
        response = await HomeHeaderAncor.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener HomeHeaderAncor' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateHomeHeaderAncor = async( req, res ) => {
    const {id} = req.params;
    const homeHeaderAncorData = req.body;

    HomeHeaderAncor.findByIdAndUpdate( {_id:id }, homeHeaderAncorData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el homeHeaderAncorData' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del homeHeaderAncorData con exito' });
        }
    });
}

const deleteHomeHeaderAncor = async( req, res ) => {
    const { id } = req.params;
    HomeHeaderAncor.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el HomeHeaderAncor' });
        }else {
            res.status(200).send({ msg: 'Social borrado con HomeHeaderAncor' });
        }
        
    });

}

module.exports = {
    createHomeHeaderAncor,
    getHomeHeaderAncors,
    updateHomeHeaderAncor,
    deleteHomeHeaderAncor
};