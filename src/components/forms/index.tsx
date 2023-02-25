import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { fontFamily } from '../../styling/GlobalStyling';
import { FormEvent, useState } from 'react';
import validator from 'validator';
import api from "../../api/api";
import axios, { Axios, AxiosError } from 'axios';
import { User } from '../../type/cards';
import { useNavigate } from "react-router-dom";
import { Response } from "../../type/navbar";

export interface LoginResponse{
    data: User,
    message: string,
    success: boolean,
    jwt: string,
}

interface FormsProps{
    type?: "login" | "register"
}

const Forms = ({type}: FormsProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    const emailHandler = (e: FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }

    const passwordHandler = (e: FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };

    const usernameHandler = (e: FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }

    const submitLoginHandler = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            const result = await api.post("/user/login", {
                "email" : email,
                "password" : password
            });
            const data = result.data as LoginResponse;
            if(data.success){
                localStorage.setItem("user", JSON.stringify(data));
                alert("user authenticated");
                navigate("/home");
            } else {
                alert("user not authenticated");
                navigate("/");
            }
        }
        catch(err){
            if(axios.isAxiosError(err)){
                console.log(err);
                alert(`${err.message}, message: user not authenticated`);
                return;
            }
        }
        
    };

    const submitRegisterHandler = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!validator.isEmail(email) || password.length < 6 || username.length < 6){
            alert("data yang diinputkan tidak valid, panjang username dan password harus >= 6");
            return;
        }
        try{
            const result = await api.post("/user/create", {
                "email" : email,
                "password" : password,
                "username" : username
            });
            const response = result.data as Response;
            alert("success create user");
            navigate("/")
        }
        catch(err){
            if(axios.isAxiosError(err)){
                alert(`${err.message}, error from server`);
            }
        }
    };

    if(type == "login"){
        return(
            <Box>
                <FormControl
                backgroundColor='white'
                width='35%'
                gap='20px'
                marginTop='5rem'
                marginBottom='5rem'
                marginLeft='25rem'
                marginRight='25rem'
                border='4px gray solid'>
                    <Flex
                    flexDir='column'>
                        <Text
                        fontFamily={fontFamily}
                        fontWeight='bolder'
                        fontSize='2rem'>Welcome back</Text>
                        <Text
                        fontFamily={fontFamily}
                        fontWeight='thin'
                        fontSize='15px'>Welcome back! Please enter your details</Text>
                    </Flex>
                    <Box
                    marginTop='20px'
                    marginBottom='20px'>
                        <FormLabel
                        fontFamily={fontFamily}
                        htmlFor="email">Email</FormLabel>
                        <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        id = "email"
                        value={email}
                        onChange={emailHandler}></Input>
                    </Box>
                    <Box
                    marginTop='20px'
                    marginBottom='20px'>
                        <FormLabel
                        fontFamily={fontFamily}
                        htmlFor="password">Password</FormLabel>
                        <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        id = "password"
                        value={password}
                        onChange={passwordHandler}></Input>
                    </Box>
                    <Flex>
                        <Button
                        backgroundColor='aqua'
                        width='60%'
                        marginLeft='70px'
                        onClick={submitLoginHandler}
                        marginBottom='30px'>
                            <Text
                            fontFamily={fontFamily}
                            color='white'>Sign in</Text>
                        </Button>
                    </Flex>
                </FormControl>
            </Box>
        )
    } else if(type == "register"){
        return(
            <Box>
                <FormControl
                border='4px solid gray'
                backgroundColor='white'
                width='35%'
                gap='20px'
                marginTop='5rem'
                marginBottom='5rem'
                marginLeft='25rem'
                marginRight='25rem'>
                    <Flex
                    flexDir='column'>
                        <Text
                        fontFamily={fontFamily}
                        fontWeight='bolder'
                        fontSize='2rem'>Welcome</Text>
                        <Text
                        fontFamily={fontFamily}
                        fontWeight='thin'
                        fontSize='15px'>Welcome new user! Please enter your details</Text>
                    </Flex>
                    <Box
                    marginTop='20px'
                    marginBottom='20px'>
                        <FormLabel
                        fontFamily={fontFamily}
                        htmlFor="username">Username</FormLabel>
                        <Input 
                        type="text" 
                        placeholder="Enter your username" 
                        id = "username"
                        value={username}
                        onChange={usernameHandler}></Input>
                    </Box>
                    <Box
                    marginTop='20px'
                    marginBottom='20px'>
                        <FormLabel
                        fontFamily={fontFamily}
                        htmlFor="email">Email</FormLabel>
                        <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        id = "email"
                        value={email}
                        onChange={emailHandler}></Input>
                    </Box>
                    <Box
                    marginTop='20px'
                    marginBottom='20px'>
                        <FormLabel
                        fontFamily={fontFamily}
                        htmlFor="password">Password</FormLabel>
                        <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        id = "password"
                        value={password}
                        onChange={passwordHandler}></Input>
                    </Box>
                    <Flex>
                        <Button
                        backgroundColor='aqua'
                        width='60%'
                        marginLeft='70px'
                        onClick={submitRegisterHandler}
                        marginBottom='30px'>
                            <Text
                            fontFamily={fontFamily}
                            color='white'>Sign up</Text>
                        </Button>
                    </Flex>
                </FormControl>
            </Box>
        )
    } else {
        return(
            <Box></Box>
        )
    }
};

export default Forms;