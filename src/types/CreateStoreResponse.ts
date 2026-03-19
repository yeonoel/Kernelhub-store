export interface CreateStoreResponse {
    success: boolean;
    message: string;
    data: {
        store: {
            id: string;
            name: string;
            slug: string;
        };
        user: {
            id: string;
            phone: string;
            firstName?: string;
        };
    };
}