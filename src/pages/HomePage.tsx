import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { fontFamily } from '../styling/GlobalStyling';

const HomePage = () => {

    const navigate = useNavigate();

    const createProductHandler = (e: FormEvent<HTMLButtonElement>) => {
        navigate("/createproduct");
    };

    const myProductHandler = (e: FormEvent<HTMLButtonElement>) => {
        navigate("/myproduct");
    };

    const allProductHandler = (e: FormEvent<HTMLButtonElement>) => {
        navigate("/allproduct");
    };

    const allLikeHandler = (e: FormEvent<HTMLButtonElement>) => {
        navigate("/likes");
    };

    return(
        <Box>
            <Navbar access="private" addBackToHomePage={undefined}/>
            <Flex
            flexDir='column'>
                <Flex
                justifyContent='center'
                gap='2rem'>
                    <Button
                    backgroundColor='grey'
                    marginTop='40px'
                    marginBottom='40px'
                    onClick={createProductHandler}>
                        <Text
                        fontFamily={fontFamily}>Create product</Text>
                    </Button>
                    <Button
                    backgroundColor='grey'
                    marginTop='40px'
                    marginBottom='40px'
                    width='12.5%'
                    onClick={myProductHandler}>
                        <Text
                        fontFamily={fontFamily}>My Product</Text>
                    </Button>
                </Flex>
                <Flex
                justifyContent='center'
                gap='2rem'>
                    <Button
                    backgroundColor='grey'
                    marginTop='40px'
                    marginBottom='40px'
                    onClick={allProductHandler}>
                        <Text
                        fontFamily={fontFamily}>Get all product</Text>
                    </Button>
                    <Button
                    backgroundColor='grey'
                    marginTop='40px'
                    marginBottom='40px'
                    onClick={allLikeHandler}>
                        <Text
                        fontFamily={fontFamily}>Get all likes</Text>
                    </Button>
                </Flex>
            </Flex>
            <Footer/>
        </Box>
    )
};

export default HomePage;