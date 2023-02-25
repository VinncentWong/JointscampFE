import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Forms from "../components/forms";
import Navbar from "../components/navbar";

const LoginPage = () => {
    return(
        <Box>
            <Navbar access="register_login" addBackToHomePage={undefined}/>
            <Forms type="login"/>
            <Footer/>
        </Box>
    )
};

export default LoginPage;