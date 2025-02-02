export interface RestBean<T> {
    code: number;
    message: string;
    data: T;
}

export interface AuthorizeToken {
    username: string;
    token: string;
    roles: string[];
    expire: number;
}

export interface User {
    id: string;
    nickname: string;
    bio: string;
    avatar: string;
    roles: string[];
}

export interface Competition {
    id: string;
    name: string;
    description: string;
    host: string;
    endDate: number;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
}