import {IMenuItem} from "@/interfaces/MenuItem";

const MenuItems: IMenuItem[] = [
    {
        id: '1',
        name: 'Главная',
        icon: 'house',
        path: '/'
    },
    {
        id: '2',
        name: 'Лицензии',
        icon: 'briefcase',
        path: '/licenses'
    },
    {
        id: '3',
        name: 'Продукты',
        icon: 'inbox',
        path: '/products'
    },
    {
        id: '4',
        name: 'Клиенты',
        icon: 'user-shield',
        path: '/clients'
    },
    {
        id: '6',
        name: 'Начисления',
        icon: 'money-bill',
        path: '/accruals'
    },
    {
        id: '7',
        name: 'Пользователи',
        icon: 'users',
        path: '/users'
    },
];

export {MenuItems};