import { SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, FormHelperText, Image, Input, InputGroup, InputLeftElement, Link, Select, Text } from "@chakra-ui/react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { fontFamily } from "../../styling/GlobalStyling";
import { NavbarProps } from "../../type/navbar";

const Navbar = ({access, addBackToHomePage}: NavbarProps) => {

    const navigate = useNavigate();

    const logoutHandler = (e: FormEvent<HTMLElement>) => {
        localStorage.removeItem("user");
        navigate("/");
    }

    if(access == "public"){
        return(
            <Flex
            width='100%'
            height='100%'
            justifyContent='end'
            backgroundColor= 'gray.600'
            flexDirection='column'>
                <Flex
                justifyContent='end'
                marginTop='20px'
                marginBottom='20px'>
                    {addBackToHomePage &&  
                        <Link 
                        href='/' 
                        width='5%'>
                            <Image 
                            src='/leftarrow.png' 
                            width='70%'
                            marginLeft='20px'></Image>
                        </Link>
                    }
                    <Flex
                    marginRight = '5%'
                    gap='17px'
                    alignItems='flex-end'
                    marginBottom='5px'>
                        <Link href='/login'>
                            <Text fontFamily={fontFamily} fontSize='20px' color='white'>Login</Text>
                        </Link>
                        <Link href='/register'>
                            <Text fontFamily={fontFamily} fontSize='20px' color='white'>Signup</Text>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        )
    } else if(access == "register_login"){
        return(
            <Flex
            backgroundColor='grey'>
                <Link 
                href='/' 
                width='5%'>
                    <Image 
                    src='/leftarrow.png' 
                    width='70%'
                    marginLeft='20px'></Image>
                </Link>
                <Text 
                fontFamily={fontFamily} 
                fontWeight='bold' 
                fontSize='20px'
                marginTop='6px'
                marginLeft='5px '>Back</Text>
            </Flex>
        )
    } else {
        return(
            <Flex
            width='100%'
            height='100%'
            justifyContent='end'
            backgroundColor='gray.600'
            flexDirection='column'>
                <Flex>
                {addBackToHomePage &&  
                        <Link 
                        href='/home' 
                        width='5%'
                        justifySelf='flex-start'>
                            <Image 
                            src='/leftarrow.png' 
                            width='70%'
                            marginLeft='20px'
                            marginTop='20px'></Image>
                        </Link>
                }
                <Flex
                justifyContent='end'
                marginTop='20px'
                marginBottom='20px'
                marginLeft='13rem'
                marginRight='20px'
                width='80%'>
                    <Flex
                    marginRight = '5%'
                    gap='17px'
                    alignItems='flex-end'
                    marginBottom='5px'>
                        <Link onClick={logoutHandler}>
                            <Text fontFamily={fontFamily} fontSize='20px' color='white'>Logout</Text>
                        </Link>
                    </Flex>
                </Flex>
                </Flex>
            </Flex>
        )
    }
}

export default Navbar;