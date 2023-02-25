import { Box, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";
import uuid from "react-uuid";
import { fontFamily } from "../../styling/GlobalStyling";
import { MyProductProps } from "../../type/cards";

const MyProduct = ({data}: MyProductProps) => {
    if(data && data.length != 0){
        const listComponent = data.map((d) => {
            const src = d.gambarProduk == undefined ? "/notfound.png" : `data:image/jpeg;base64, ${d.gambarProduk}`;
            return (
                <Card 
                maxW='sm' 
                key={uuid()} 
                gap='4px'
                margin='20px'>
                        <CardHeader>
                            <Flex gap='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                        <Heading size='sm'>{d.namaProduk}</Heading>
                                        <Text>{d.createdAt}</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>
                                {d.detailProduk}
                            </Text>
                        </CardBody>
                        <Image
                            objectFit='cover'
                            src={src}
                            alt='Chakra UI' 
                            width='90%'
                            height='90%'/>
        
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}
                        >
                        </CardFooter>
                    </Card>
            )
        });
        return(
            <Flex
            flexWrap='wrap'>
                {listComponent}
            </Flex>
        )
    } else {
        return(
            <Box
            marginTop='6rem'
            marginBottom='6rem'
            marginLeft='30rem'
            marginRight='30rem'>
                <Text
                fontFamily={fontFamily}
                fontSize='3rem'
                fontWeight='bold'>No Product</Text>
            </Box>
        )
    }
};

export default MyProduct;