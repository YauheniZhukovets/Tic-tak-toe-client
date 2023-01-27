import React from 'react';
import {SideBar} from '../components/SideBar';
import {Col, Container, Row} from 'react-bootstrap';
import {Users} from '../components/Users';
import {AppRouts} from '../components/AppRouts';
import {AppState} from '../context/AppProvider';

export const AppPage = React.memo(() => {
    const {user} = AppState()

    return (
        <div>
            {user && <SideBar/>}
            <Container className="mt-3">
                <Row>
                    {user ?
                        <Col md={3}>
                            <Users/>
                        </Col>
                        :
                        <Col md={3}>

                        </Col>
                    }
                    <Col md={!user ? 12 : 9}>
                        <AppRouts/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
})
