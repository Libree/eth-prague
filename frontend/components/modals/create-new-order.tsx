import { useState, ChangeEvent, useContext } from "react";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { User } from '../../context';


interface ModalProps {
    openModal: boolean;
    closeHandler: () => void;
}

export function NewOrderModal({ openModal, closeHandler }: ModalProps) {

    const { addOrder } = useContext(User);


    const [input, setInput] = useState({
        principal: "",
        amount: "",
        collateral: "",
        duration: ""
    });

    const handleInputChange = (e: ChangeEvent<any>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandle = async () => {
        setInput({
            principal: input.principal,
            amount: input.amount,
            collateral: input.collateral,
            duration: input.duration
        });

        addOrder({
            principal: input.principal,
            amount: input.amount,
            collateral: input.collateral,
            duration: input.duration
        })

        setInput({
            principal: "",
            amount: "",
            collateral: "",
            duration: ""
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
                        placeholder="Asset to borrow"
                        name="principal"
                        value={input.principal}
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
                        placeholder="Collateral"
                        name="collateral"
                        value={input.collateral}
                        onChange={handleInputChange}
                    />

                    <Input
                        required
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Loan Duration (days)"
                        name="duration"
                        value={input.duration}
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
