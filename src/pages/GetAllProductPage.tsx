import { Box } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "../api/api";
import Cards from "../components/cards";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { User } from "../type/cards";
import { Response } from "../type/navbar";

const GetAllProductPage = () => {

    const [data, setData] = useState<Response>();
    const [click, setClick] = useState<boolean>();

    useEffect(() => {
        const result = api.get("/user/gets");
        result.then((d) => {
            console.log(`data = ${JSON.stringify(d)}`);
            setData(d.data);
        }).catch((err: AxiosError) => {
            alert(err.message);
        });
    }, []);

    return(
        <Box>
            <Navbar addBackToHomePage access="private"/>
            <Cards data={data?.data as User[]} setClick={setClick}/>
            <Footer/>
        </Box>
    )
};

export default GetAllProductPage;