import React from 'react';
import { Modal, Button } from 'antd';
import { splitForCards } from '../../utils/utils';

export const ModalComponent = ({ modalVisibility, handleOk, children, type, id }) => {

    return (

        <div className="modal">

            <Modal title={type} visible={modalVisibility} onOk={handleOk}
                footer={[
                    <Button
                        type="primary"
                        onClick={() => handleOk()}
                    >
                        Close
                     </Button>,
                ]}>
               {children}
              
            </Modal>
        </div>
    );

}