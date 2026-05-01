export const OrderStatus = {
    CONFIRMED_BY_CLIENT: "confirmed_by_client",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]