export interface IData {
    [key: string]: any
}

export interface IMeta {
    [key: string]: any
}

export interface INavigation {
    pageSize: number;
    page: number;
    hasMore: boolean
}


export interface IResponse {
    success: boolean;
    field_error?: string;
    error: string;
    data?: any;
    meta?: IMeta;
    navigation?: INavigation;
}

export interface IFilter {
    [key: string]: any;
    navigation?: INavigation;
}

export interface ISourceServiceParams {
    endpoint: string;
    keyProperty?: string;
    binding: ISourceServiceBinding;
}

export interface ISourceServiceBinding {
    query: string;
    delete: string;
    create: string;
    update: string;
    list: string;
    search: string;
    [key: string]: string;
}