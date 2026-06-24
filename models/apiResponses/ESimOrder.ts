export interface ESimOrderModel {
    data: Data;
    meta: Meta;
    [property: string]: any;
}

export interface Data {
    brand_settings_name: string;
    code: string;
    created_at: string;
    currency: string;
    data: string;
    description: string;
    esim_type: string;
    id: number;
    installation_guides: InstallationGuides;
    manual_installation: string;
    package: string;
    package_id: string;
    price: number;
    pricing_model: string;
    qrcode_installation: string;
    quantity: string;
    sims: Sim[];
    type: string;
    validity: number;
    [property: string]: any;
}

export interface InstallationGuides {
    en: string;
    [property: string]: any;
}

export interface Sim {
    airalo_code?: null;
    apn_type?: string;
    apn_value?: null;
    confirmation_code?: null;
    created_at?: string;
    direct_apple_installation_url?: string;
    iccid?: string;
    id?: number;
    imsis?: null;
    is_roaming?: boolean;
    lpa?: string;
    matching_id?: string;
    qrcode?: string;
    qrcode_url?: string;
    [property: string]: any;
}

export interface Meta {
    message: string;
    [property: string]: any;
}