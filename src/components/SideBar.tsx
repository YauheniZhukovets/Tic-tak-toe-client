import React from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {AppState} from '../context/AppProvider';


export const SideBar = React.memo(() => {
    const navigate = useNavigate()
    const {user} = AppState()

    const logOut = () => {
        localStorage.removeItem("userInfo");
        navigate(LOGIN_ROUTE)
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>{user?.name}</Navbar.Brand>

                    <Button className="m-1"
                            variant="outline-primary"
                            onClick={logOut}
                    >Выйти
                    </Button>
                </Container>
            </Navbar>
        </div>
    )
})