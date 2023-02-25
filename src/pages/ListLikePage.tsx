import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import MyProduct from '../components/cards/myproduct';
import { useState, useEffect } from 'react';
import { Response } from "../type/navbar";
import api from "../api/api";
import getUser from '../util/user';
import { Produk } from "../type/cards";

const ListLike = () => {

    const [data, setData] = useState<Response>();

    useEffect(() => {
        const user = getUser();
        const axiosRes = api.get(`/like/getlikes/${user.data.id}`, {
            headers : {
                Authorization : `Bearer ${user.jwt}`
            }
        })
        axiosRes.then((d) => setData(d.data)).catch((err) => alert(err));
    }, []);

    return(
        <Box>
            <Navbar access="private" addBackToHomePage/>
            <MyProduct data={data?.data as Produk[]}/>
            <Footer/>   
        </Box>
    )
};

export default ListLike;