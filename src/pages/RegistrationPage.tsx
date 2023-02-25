import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Forms from "../components/forms";
import Navbar from "../components/navbar";

const RegistrationPage = () => {
    return(
        <Box>
            <Navbar access="register_login" addBackToHomePage={undefined}/>
            <Forms type="register"></Forms>
            <Footer/>
        </Box>
    );
};

export default RegistrationPage;