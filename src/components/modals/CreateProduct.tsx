import { Box, Flex, Text } from "@chakra-ui/react";
import { createPortal } from "react-dom";
import { fontFamily } from "../../styling/GlobalStyling";
import { ModalProps } from "../../type/modals";

const CreateProduct = ({isOpen}: ModalProps) => {
    console.log(`isOpen createproduct = ${isOpen}`);
    return(
        <>
            { isOpen && <Box
            width='100%'
            height='80%'
            position='absolute'
            backgroundColor='rgba(50,50,50,0.6)'>
                {createPortal(
                    <Flex
                    position='absolute'
                    top='10%'
                    flexDir='column'>
                        <Flex
                        backgroundColor='white'
                        bottom='15%'>
                            <Text
                            fontFamily={fontFamily}
                            >Create Your Amazing Product 🤩</Text>
                        </Flex>
                    </Flex>,
                    document.getElementById("modal") as HTMLElement
                )}
            </Box>
        } 
        </>
    )
};

export default CreateProduct;