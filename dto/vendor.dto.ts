export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: number | string;
    email: string;
    password: string;
}

export interface LoginVendorInput {
    email: string;
    password: string;
}