import { useState, ChangeEvent, useContext } from "react";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { User } from "../../context";

interface ModalProps {
    openModal: boolean;
    closeHandler: () => void;
}

export function SubscriptionModal({ openModal, closeHandler }: ModalProps) {
    const { createSubscription } = useContext(User);
    const [input, setInput] = useState({
        name: "",
        symbol: "",
        price: "",
        paymentToken: "",
    });

    const handleInputChange = (e: ChangeEvent<any>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandle = async () => {
        console.log(input)

        if (!input.name || !input.symbol || !input.price) {
            return;
        }
        await createSubscription(input);
        setInput({
            name: "",
            symbol: "",
            price: "",
            paymentToken: "",
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
                        Create a new subscription
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
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        required
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Symbol"
                        name="symbol"
                        value={input.symbol}
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
                    <select
                        name="paymentToken"
                        value={input.paymentToken}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: "100%",
                            height: "3rem",
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "transparent",
                            border: "1px solid var(--nextui-colors-accents6)",
                            color: "var(--nextui-colors-accents6)",
                        }}
                    >
                        <option
                            value="USDC"
                            style={{
                                backgroundColor: "var(--nextui-colors-accents6)",
                                color: "var(--nextui-colors-background)",
                            }}
                        >
                            USDC
                        </option>
                    </select>
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
