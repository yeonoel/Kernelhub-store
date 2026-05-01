import { OrderStatus } from "@/types/order-status"

export const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
    [OrderStatus.CONFIRMED_BY_CLIENT]: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
    [OrderStatus.DELIVERED]: { label: "Livré", color: "bg-green-100 text-green-800" },
    [OrderStatus.CANCELLED]: { label: "Annulé", color: "bg-red-100 text-red-800" },
};

export const StatusCanBeChanged = {
    [OrderStatus.CONFIRMED_BY_CLIENT]: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
    [OrderStatus.DELIVERED]: { label: "Livré", color: "bg-green-100 text-green-800" },
    [OrderStatus.CANCELLED]: { label: "Annulé", color: "bg-red-100 text-red-800" },
};

export const filterButtons = [
    { label: "Tous", status: null },
    { label: "En attente", status: OrderStatus.CONFIRMED_BY_CLIENT, color: "bg-yellow-100 text-yellow-800" },
    { label: "Livré", status: OrderStatus.DELIVERED, color: "bg-green-100 text-green-800" },
];