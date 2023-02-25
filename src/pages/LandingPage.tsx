import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "../api/api";
import Cards from "../components/cards";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { fontFamily } from "../styling/GlobalStyling";
import { User } from "../type/cards";
import { Response } from "../type/navbar";

const LandingPage = () => {
    const [data, setData] = useState<Response>();
    const [click, setClick] = useState<boolean>();

    useEffect(() => {
        const result = api.get("/user/gets");
        result.then((d) => {
            setData(d.data);
        }).catch((err: AxiosError) => {
            console.log(err);
        });
    }, []);
    
    return(
        <Box
        position='relative'>
            <Navbar access="public" addBackToHomePage={undefined}></Navbar>
            {click && 
                <Box
                position='fixed'
                width='50%'
                zIndex='3'
                marginLeft='20rem'
                marginRight='20rem'
                marginTop='5rem'
                backgroundColor='red'>
                    <Flex
                    flexDir='column'>
                        <Flex
                        paddingTop='5rem'
                        paddingLeft='13rem'>
                            <Text
                            fontFamily={fontFamily}
                            fontWeight='bold'
                            color='white'>Please sign in first to like</Text>
                        </Flex>
                        <Box
                        alignSelf='end'
                        width='20%'
                        marginTop='8rem'
                        marginBottom='2rem'
                        marginLeft='2rem'
                        marginRight='2rem'>
                            <Button
                            onClick={() => setClick(false)}>
                                <Text
                                fontFamily={fontFamily}
                                fontWeight='bold'
                                backgroundColor='gray.600'
                                color='black'>Close</Text>
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            }
            <Cards data={data?.data as User[]} setClick={setClick}></Cards>
            <Footer></Footer>
        </Box>
    )
};

export default LandingPage;