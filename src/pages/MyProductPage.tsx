import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from 'react';
import getUser from "../util/user";
import { Response } from "../type/navbar";
import api from "../api/api";
import MyProduct from "../components/cards/myproduct";
import { Produk } from "../type/cards";

const MyProductPage = () => {

    const [datas, setDatas] = useState<Produk[]>();
    console.log(`user.data.id = ${getUser().data.id}`);
    useEffect(() => {
        const user = getUser();
        const result = api.get(`/produk/get/${user.data.id}`, {
            headers : {
                "Authorization" : `Bearer ${user.jwt}`
            }
        });
        result.then((d) => {
            const res = d.data as Response;
            const data = res.data as Produk[];
            setDatas(data);
        }).catch((err) => alert(err));
    }, []);

    return(
        <Box>
            <Navbar access="private" addBackToHomePage/>
            <MyProduct data={datas}/>
            <Footer/>
        </Box>
    )
};

export default MyProductPage;