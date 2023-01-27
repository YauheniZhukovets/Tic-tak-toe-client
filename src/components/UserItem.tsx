import React from 'react';
import {MAIN_ROUTE} from '../utils/consts';
import {Button} from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom';
import {User} from '../interface/interface';

type UserItemType = {
    user: User
}
export const UserItem: React.FC<UserItemType> = React.memo(({user}) => {
    const {pathname} = useLocation()
    const idFromUrl = pathname.replace('/', '')

    return (
        <NavLink key={user._id} to={MAIN_ROUTE + `${user._id}`}>
            <Button active={idFromUrl === user._id}
                    variant="outline-secondary"
            >
                {user.name}
            </Button>
        </NavLink>
    )
})