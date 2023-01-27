import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {login} from "../http/authAPI";
import {MAIN_ROUTE} from "../utils/consts";

export const LoginPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo')!)
        if (user) {
            navigate(MAIN_ROUTE)
        }
    }, [navigate])

    const submit = async () => {
        try {
            await login(name)
            navigate(MAIN_ROUTE)
        } catch (e: any) {
            throw new Error(e.messages)
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight}}
        >
            <Card className='w-50 p-5'>
                <h2 className='m-auto'>Вход</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control placeholder='Введите никнейм'
                                  className='mt-3'
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>

                    <div className='d-flex justify-content-center align-items-center mt-3 pl-3 pr-3'>
                        <Button variant='outline-primary'
                                onClick={submit}
                                disabled={!name.length}
                        >Войти
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}