import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { fontFamily } from "../../styling/GlobalStyling";
import { createPortal } from 'react-dom';

const Footer = () => {
    return(
        createPortal(<Box
        backgroundColor='gray.600'
        width='100%'
        height='100%'
        position='relative'>
            <Flex
            flexDirection='column'
            alignItems='center'>
                <Text 
                fontFamily={fontFamily} 
                color='white'
                fontWeight='bold'
                paddingTop='30px'>Made with ❤️ by Vinncent Alexander Wong</Text>
                <Flex
                justifyContent='center'
                gap='40px'>
                    <Link href="https://github.com/VinncentWong" width='5%'marginTop='50px' marginBottom='50px'><Image alt="Github" src="/github.png"></Image></Link>
                    <Link href="https://instagram.com/centwong_" width='5%'marginTop='50px' marginBottom='50px'><Image alt="Github" src="/instagram.jpg"></Image></Link>
                    <Link href="https://www.linkedin.com/in/vinncent-alexander-wong-493759213/" width='5%'marginTop='50px' marginBottom='50px'><Image alt="Github" src="/linkedin.png"></Image></Link>
                </Flex>
            </Flex>
        </Box>, document.getElementById("footer") as HTMLElement)
    );
};

export default Footer;