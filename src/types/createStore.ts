export interface CreateStoreDto {
    name: string;
    whatsappNumber: string;
    vendorName: string;
    password: string;
    description?: string;
    logo?: File;
}