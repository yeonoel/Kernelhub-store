import { OrderStatus } from "@/types/order-status";

/**
 * Return true if the order can be updated to a new status, false otherwise.
 * @param {OrderStatus} current - the current status of the order
 * @return {boolean} true if the order can be updated, false otherwise
 */
export const canBeUpdate = (current: OrderStatus) => {
    if (current === OrderStatus.CONFIRMED_BY_CLIENT) return true;
    if (current === OrderStatus.DELIVERED) return true;
    if (current === OrderStatus.CANCELLED) return true;
    return false;
};

/**
 * Return true if the order can be changed from the current status to the new status, false otherwise.
 * @param {OrderStatus} current - the current status of the order
 * @param {OrderStatus} newStatus - the new status of the order
 * @return {boolean} true if the order can be changed, false otherwise
 */
export const canChangeTo = (current: OrderStatus, newStatus: OrderStatus) => {
    if (current === OrderStatus.CONFIRMED_BY_CLIENT && newStatus === OrderStatus.APPROUVED_BY_SELLER) return true;
    if (current === OrderStatus.APPROUVED_BY_SELLER && newStatus === OrderStatus.CANCELLED) return true;
    if (current === OrderStatus.APPROUVED_BY_SELLER && newStatus === OrderStatus.DELIVERED) return true;
    if (current === newStatus) return true;
    return false;
};