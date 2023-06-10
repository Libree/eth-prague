import { useContext } from "react";
import { Button, Modal, Text } from "@nextui-org/react";
import { User } from "../../context";
import { useRouter } from "next/router";

export function LoginToContinueModal() {
    const { loginLens, openAlertModal, setOpenAlertModal } = useContext(User);
    const router = useRouter();

    const handleBack = () => {
        setOpenAlertModal(false)
        router.push('/')
    }

    return (
        <>
            <Modal
                blur
                preventClose
                aria-labelledby="modal-title"
                open={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
            >
                <Modal.Header>
                    <Text id="modal-title" b size={18} color="secondary" css={{ textTransform: 'uppercase' }}>
                        Alert!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text
                        h5
                        size={16}
                        css={{
                            mb: '$2',
                            textAlign: 'center',
                        }}
                    >
                        You need to login to continue.
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="primary" onPress={handleBack}>
                        Go back
                    </Button>
                    <Button auto color={"secondary"} onPress={loginLens}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
