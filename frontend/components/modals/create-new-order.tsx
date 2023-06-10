import { useState, ChangeEvent } from "react";
import { Button, Input, Modal, Text } from "@nextui-org/react";

interface ModalProps {
    openModal: boolean;
    closeHandler: () => void;
}

export function NewOrderModal({ openModal, closeHandler }: ModalProps) {
    const [input, setInput] = useState({
        token: "",
        amount: "",
        price: "",
    });

    const handleInputChange = (e: ChangeEvent<any>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandle = async () => {
        if (!input.token || !input.amount || !input.price) {
            return;
        }
        setInput({
            token: "",
            amount: "",
            price: "",
        });
        closeHandler();
    };

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
                        Create a new market order
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
                        placeholder="Token"
                        name="token"
                        value={input.token}
                        onChange={handleInputChange}
                    />
                    <Input
                        required
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Amount"
                        name="amount"
                        value={input.amount}
                        onChange={handleInputChange}
                    />
                    <Input
                        required
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Price"
                        name="price"
                        value={input.price}
                        onChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Cancel
                    </Button>
                    <Button auto onPress={submitHandle}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
