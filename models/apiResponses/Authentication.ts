export interface AuthenticationModel {
    data: Data;
    meta: Meta;
    [property: string]: any;
}

export interface Data {
    access_token: string;
    expires_in: number;
    token_type: string;
    [property: string]: any;
}

export interface Meta {
    message: string;
    [property: string]: any;
}