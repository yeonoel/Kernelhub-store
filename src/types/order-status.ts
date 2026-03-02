export const OrderStatus = {
    PENDING_CONFIRMATION: "pending_confirmation",
    CONFIRMED_BY_CLIENT: "confirmed_by_client",
    APPROUVED_BY_SELLER: "approved_by_seller",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]