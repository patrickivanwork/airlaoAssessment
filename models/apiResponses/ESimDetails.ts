export interface ESimDetailsModel {
    data: Data;
    meta: Meta;
    [property: string]: any;
}

export interface Data {
    airalo_code: null;
    apn_type: string;
    apn_value: null;
    brand_settings_name: string;
    confirmation_code: string;
    created_at: string;
    direct_apple_installation_url: string;
    iccid: string;
    id: number;
    imsis: null;
    is_roaming: boolean;
    lpa: string;
    matching_id: string;
    order: null;
    qrcode: string;
    qrcode_url: string;
    /**
     * true - if sim is recycled. - false - otherwise
     */
    recycled: boolean;
    /**
     * Timestamp of when the sim was recycled in format Y-m-d H:i:s
     */
    recycled_at: Date | null;
    simable: Simable;
    voucher_code: null;
    [property: string]: any;
}

export interface Simable {
    code: string;
    created_at: string;
    currency: string;
    data: string;
    description: null;
    esim_type: string;
    id: number;
    installation_guides: InstallationGuides;
    manual_installation: string;
    package: string;
    package_id: string;
    price: string;
    qrcode_installation: string;
    quantity: number;
    sharing: Sharing;
    status: Status;
    type: string;
    user: User;
    validity: string;
    [property: string]: any;
}

export interface InstallationGuides {
    en: string;
    [property: string]: any;
}

export interface Sharing {
    access_code: string;
    link: string;
    [property: string]: any;
}

export interface Status {
    name: string;
    slug: string;
    [property: string]: any;
}

export interface User {
    address: null;
    city: null;
    company: string;
    country_id: null;
    created_at: string;
    email: string;
    id: number;
    mobile: null;
    name: string;
    postal_code: null;
    state: null;
    [property: string]: any;
}

export interface Meta {
    message: string;
    [property: string]: any;
}