//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Modal } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 



export const BasicModal = ( props ) => {
    //Extraemos props:
    const { show, close, title, size, children } = props;

    return (
        <Modal closeIcon open={show} onClose={close} size={size} >
            
            {title && <Modal.Header>{ title }</Modal.Header>}
            
            <Modal.Content>{ children }</Modal.Content>
        </Modal>
    )
}

BasicModal.defaultProps = {
    size: 'tiny',

}