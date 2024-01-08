import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { routerList } from '../../utils/router'

import classes from './styles/header.module.scss'
import classNames from 'classnames'

interface HeaderProps {}

type NavLink = {
    isActive: boolean
}

const Header: FC<HeaderProps> = () => {
    const setNavClasses = ({ isActive }: NavLink) => {
        if (isActive) {
            return 'active'
        }
    }

    if (routerList?.length) {
        return (
            <header className={classes['header']}>
                <nav>
                    <ul className={classes['header-list']}>
                        {routerList.map((item) => (
                            <li className={classes['header-item']} key={item.name}>
                                <NavLink to={item.url} className={classNames(setNavClasses, 'btn btn-outline-primary')}>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        )
    }

    return null
}

export default Header
