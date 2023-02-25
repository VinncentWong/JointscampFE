import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { fontFamily } from "../styling/GlobalStyling";
import { useState, FormEvent, ChangeEvent } from 'react';
import api from "../api/api";
import { isAxiosError } from "axios";
import getUser from "../util/user";
import { useNavigate } from 'react-router-dom';
import { LoginResponse } from "../components/forms";

interface CreateProductFormData{
    produkName: string,
    produkLocation: string,
    produkDetail: string
}

const CreateProductPage = () => {

    const [productName, setProductName] = useState<string>("");
    const [productDetail, setProductDetail] = useState<string>("");
    const [productLocation, setProductLocation] = useState<string>(""); 
    const [file, setFile] = useState<any>();
    const navigate = useNavigate();

    const productNameHandler = (e: FormEvent<HTMLInputElement>) =>{
        setProductName(e.currentTarget.value);
    };

    const productDetailHandler = (e: FormEvent<HTMLInputElement>) =>{
        setProductDetail(e.currentTarget.value);
    };
    
    const productLocationHandler = (e: FormEvent<HTMLInputElement>) =>{
        setProductLocation(e.currentTarget.value);
    };

    const fileHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        try{
            const files = e.target.files as FileList;
            const file = files[0];
            setFile(file);
        }
        catch(err){
            alert(err);
        }
    };

    const buttonHandler = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(productName == undefined || productName.length <= 4){
            alert("product name can't empty and should be > 4");
            return;
        }
        if(productDetail == undefined || productDetail.length <= 4){
            alert("product detail can't empty and shold be > 4");
            return;
        }
        if(productLocation == undefined || productLocation.length <= 4){
            alert("product location can't empty and shold be > 4");
            return;
        }
        if(file == undefined){
            alert("file can't empty");
            return;
        }
        try{
            const formData = new FormData();
            const user = getUser();
            const data: CreateProductFormData = {
                produkDetail: productDetail,
                produkLocation: productLocation,
                produkName: productName
            };
            /*
            Instead send JSON String or JSON object, we should
            send json file as part file so backend will understand 
            what were we sent
            */
            const blob = new Blob([JSON.stringify(data)], {
                type: "application/json"
            });
            formData.append("picture", file);
            formData.append("data", blob);
            await api.post(`/produk/create/${user.data.id}`, formData, {
                headers : {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : `Bearer ${user.jwt}`
                }
            });
            alert("success create product");
            navigate("/home");
        }
        catch(err){
            if(isAxiosError(err)){
                const responseError = err.response?.data as LoginResponse;
                if(responseError){
                    alert(`internal server error when create product, ${responseError.message}`);
                } else {
                    alert(`internal server error when create product, ${err.message}`);
                }
            } else {
                alert(err);
            }
        }
    };

    return(
        <Box>
            <Navbar access="private" addBackToHomePage/>
            <Flex>
                <Flex
                width='100%'
                justifyContent='center'>
                    <Box
                    backgroundColor='gray.600'
                    width='40%'
                    marginTop='50px'
                    marginBottom='50px'>
                        <FormControl
                        id = "formcontrol">
                            <Box
                            marginTop='30px'
                            marginBottom='30px'>
                                <FormLabel
                                htmlFor='product-name'><Text
                                fontFamily={fontFamily}
                                fontWeight='bold'>Product Name</Text></FormLabel>
                                <Input 
                                type='text' 
                                onChange={productNameHandler} 
                                value={productName}
                                id='product-name'
                                color='white'
                                placeholder="Input your product name"
                                _placeholder={{
                                    'backgroundColor' : 'white'
                                }}></Input>
                            </Box>
                            <Box
                            marginTop='30px'
                            marginBottom='30px'>
                                <FormLabel
                                htmlFor='product-detail'><Text
                                fontFamily={fontFamily}
                                fontWeight='bold'>Product Detail</Text></FormLabel>
                                <Input 
                                type='text' 
                                onChange={productDetailHandler} 
                                value={productDetail}
                                id='product-detail'
                                color='white'
                                placeholder="Input your product detail"
                                _placeholder={{
                                    'backgroundColor' : 'white'
                                }}></Input>
                            </Box>
                            <Box
                            marginTop='30px'
                            marginBottom='30px'>
                                <FormLabel
                                htmlFor='product-location'><Text
                                fontFamily={fontFamily}
                                fontWeight='bold'>Product Location</Text></FormLabel>
                                <Input 
                                type='text' 
                                onChange={productLocationHandler} 
                                value={productLocation}
                                id='product-location'
                                color='white'
                                placeholder="Input your product location"
                                _placeholder={{
                                    'backgroundColor' : 'white'
                                }}></Input>
                            </Box>
                            <Box
                            marginTop='30px'
                            marginBottom='30px'>
                                <FormLabel
                                htmlFor='product-image'><Text
                                fontFamily={fontFamily}
                                fontWeight='bold'>Product Picture</Text></FormLabel>
                                <Input 
                                type='file' 
                                onChange={fileHandler} 
                                id='product-image'
                                color='white'
                                placeholder="Input your product location"
                                _placeholder={{
                                    'backgroundColor' : 'white'
                                }}></Input>
                            </Box>
                        </FormControl>
                        <Button
                        backgroundColor='blue.600'
                        marginLeft='75%'
                        marginTop='20px'
                        marginBottom='40px'
                        onClick={buttonHandler}><Text
                        fontFamily={fontFamily}>Submit</Text></Button>
                    </Box>
                </Flex>
            </Flex>
            <Footer/>
        </Box>
    )
};

export default CreateProductPage;