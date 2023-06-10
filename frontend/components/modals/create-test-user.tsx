import { useContext, useState, ChangeEvent } from "react";
import { Button, FormElement, Input, Modal, Text } from "@nextui-org/react";
import { User } from "../../context";
import { CreateProfileRequest } from '@lens-protocol/client';

interface ModalProps {
    openModal: boolean;
    closeHandler: () => void;
}

export function TestUserModal({ openModal, closeHandler }: ModalProps) {
    const [handle, setHandle] = useState<string>('');

    const { createTestProfile } = useContext(User);
    
    const handleInputChange = (e: ChangeEvent<FormElement>) => {
        const inputValue = e.target.value;
        const filteredValue = inputValue.toLowerCase().replace(/[^a-z0-9-_]/g, '');
        setHandle(filteredValue);
    }

    const submitHandle = async () => {
        if (!handle) return;
        
        const handleValue: CreateProfileRequest = {
            handle: handle,
        };
        createTestProfile(handleValue);
        setHandle('');
        closeHandler();
    };

    const isHandleValid = handle.trim() !== '';

    return (
        <>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={openModal}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" b size={18}>
                        Create a new test user
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        required
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Handle"
                        value={handle}
                        onChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Cancel
                    </Button>
                    <Button auto onPress={submitHandle} disabled={!isHandleValid}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
