//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Confirm, Image } from "semantic-ui-react";

//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../components/Shared';
import { Pdf } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV } from '../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { PdfForm } from '../PdfForm';
//IMPORTS Styles/Images DE LA APP:
import { image, Icon } from '../../../assets';
import './PdfItem.scss';


const pdfController = new Pdf();

export const PdfItem = ( props ) => {
    //Obtenemos props:
    //console.log(props)
    const { pdf, onReload } = props;

    //Obtenemos el token:
    const { accessToken } = useAuth();
     
    //Creamos los Estados:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isDelete, setIsDelete] = useState(false);

  
    //Creamos la funcion de apertura y cierre del modal:
    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
    const onOpenCloseConfirm = () => setShowConfirm( (prevState) => !prevState );

    //Creamos la funcion updateModal para actualizar el pdf:
    const openUpdateMenu = () => {
        setTitleModal(`Update pdf: ${ pdf.title }`); 
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            pdf.active 
            ? `Desactivate pdf ${pdf.title }` 
            : `Activate pdf ${ pdf.title }`
        );
        onOpenCloseConfirm();
    }

    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
            //console.log('pdf before',pdf)
          await pdfController.updatePdf(accessToken, pdf._id, {
            active: !pdf.active,
          });
            //console.log('pdf after',pdf)
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };

    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete pdf ${pdf.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await pdfController.deletePdf(accessToken, pdf._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="pdf-item">
                
                <div className="cont-wrap">
                    <div className="pdf-item__miniature">
                        <span className="cont-miniature">
                            
                            {
                               pdf?.image && 
                               <Image  className="miniature" 
                               src={pdf.image 
                                   ? `${ENV.BASE_PATH}/${pdf.image}`
                                   : image.noImage }/>
                            }
 
                        </span>
                    </div>
                    <div className="pdf-item__info">    
                        <div>
                            <span className="pdf-item__info-title">
                                {pdf.claim}   
                            </span>
                            <span className="pdf-item__info-path">
                                btnPath: {pdf.btnPath}
                            </span>
                            <span className="pdf-item__info-path">
                                Order: {pdf.order}
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div className="btn-content">
                    <Button onClick={ openUpdateMenu } 
                            className='btn edit'
                    > 
                        <Icon.pencil/>
                    </Button>

                    <Button className='btn btnActivate'
                            color={ pdf.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        {pdf.active ? <Icon.ban/> : <Icon.check/>}
                    </Button>

                    <Button className='btn btnDelete'
                            color='red' 
                            onClick={ openDeleteConfirm }
                    >
                        <Icon.trash/>
                    </Button>
                </div>
            </div>
            <BasicModal show={ showModal } close={ onOpenCloseModal } title={ titleModal }>
                <PdfForm close={onOpenCloseModal} onReload={onReload} pdf={pdf} />
            </BasicModal>

            <Confirm  
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={isDelete ? onDelete : onActivateDesactivate}
                constent={ confirmMessage } 
                size='mini'
            />
        </>
        
    )
}