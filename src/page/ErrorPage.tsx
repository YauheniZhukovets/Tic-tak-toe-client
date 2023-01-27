import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {NavLink} from 'react-router-dom';
import {MAIN_ROUTE} from '../utils/consts';

export const ErrorPage = () => {
    return (
        <Card className="text-center">
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>404</Card.Title>
                <Card.Text>
                    Страница не найдена
                </Card.Text>
                <NavLink to={MAIN_ROUTE}>
                    <Button variant="outline-primary">На главную</Button>
                </NavLink>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
    )
}
