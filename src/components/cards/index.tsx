import { StarIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { CardsProps } from "../../type/cards";
import uuid from 'react-uuid';
import { FormEvent } from 'react';
import api from "../../api/api";
import getUser from "../../util/user";
import axios from 'axios';
import { Response } from "../../type/navbar";
import { fontFamily } from "../../styling/GlobalStyling";

const Cards = ({data, setClick}: CardsProps) => {

    const likeHandler = async (produkId: string, color: string) => {
        if(localStorage.getItem("user") == null){
            setClick(true);
        } else {
            const user = getUser();
            try{
                const button = document.getElementById(`button${produkId}`);
                if(button){
                    if(button.style.backgroundColor == ""){
                        button.style.backgroundColor = color;
                    }
                }
                if(button?.style.backgroundColor == "red"){
                    await api.
                            delete(`/like/delete?userId=${user.data.id}&produkId=${produkId}`,{
                                headers : {
                                    "Authorization" : `Bearer ${user.jwt}`
                                }
                            });
                    if(button && localStorage.getItem("user") != null){
                        const style = button.style;
                        style.backgroundColor = "white";
                        localStorage.setItem(`produk${produkId}${user.data.id}`, "white");
                    }
                    alert("success delete like");
                } else {
                    await api
                        .post(`/like/create?userId=${user.data.id}&produkId=${produkId}`,
                        undefined,
                        {
                            headers : {
                                "Authorization" : `Bearer ${user.jwt}`
                            }
                        });
                    if(button && localStorage.getItem("user") != null){
                        const style = button.style;
                        style.backgroundColor = "red";
                        localStorage.setItem(`produk${produkId}${user.data.id}`, "red");
                    }
                    alert("success like");
                }
            }
            catch(err){
                if(axios.isAxiosError(err)){
                    const res = err.response?.data as Response;
                    if(res.message){
                        alert(`exception occured, message: ${res.message} with status ${res.success}`);
                    } else {
                        alert(`exception occured, message: ${err.message}`);
                    }
                } else {
                    alert(`exception occured: ${err}`);
                }
            }
        }
    };

    if(data){
        const cards = data
            .filter((d) => {
                if(d.produks.length == 0 || d.produks == undefined){
                    return false;
                } else {
                    return true;
                }
            })
            .map((d) => {
            let color = "";
            if(localStorage.getItem("user") != null){
                const localStorageColor = localStorage.getItem(`produk${d.produks[0].id}${getUser().data.id}`);
                if(localStorageColor){
                    color = localStorageColor;
                }
            } else {
                color = "white";
            }
            const src = d.produks[0]?.gambarProduk == undefined ? "/notfound.png" : `data:image/jpeg;base64, ${d.produks[0]?.gambarProduk}`;
            return (
                <Card maxW='sm' key={uuid()} gap='4px'>
                    <CardHeader>
                        <Flex gap='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={d.username} src='https://brokenlink.com' />
                                <Box>
                                    <Heading size='sm'>{d.username}</Heading>
                                    <Text
                                    fontFamily={fontFamily}
                                    fontWeight='bold'>{d.produks[0].namaProduk}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            {d.produks[0]?.detailProduk}
                        </Text>
                    </CardBody>
                    <Image
                        objectFit='cover'
                        src={src}
                        alt='Chakra UI' 
                        width='90%'/>
    
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        <Button 
                        id={`button${d.produks[0]?.id}`}
                        flex='1' 
                        variant='ghost' 
                        leftIcon={<StarIcon />}
                        backgroundColor={color}
                        onClick={(e: FormEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            likeHandler(d.produks[0]?.id, color)
                        }}>
                            Like
                        </Button>
                    </CardFooter>
                </Card>
            );
        });
    
        return(
            <Flex
            flexWrap='wrap'
            gap='10px'>
                {cards}
            </Flex>
        )
    } else {
        return(
            <Box>
                Data not found
            </Box>
        )
    }
}

export default Cards;