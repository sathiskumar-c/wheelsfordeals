/**
 * Utility functions for My Orders page
 */

// Order status configurations
export const ORDER_STATUSES = {
    PROCESSING: 'Processing',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
};

// Status color mappings for Material-UI
export const STATUS_COLORS = {
    [ORDER_STATUSES.DELIVERED]: 'success',
    [ORDER_STATUSES.IN_TRANSIT]: 'info',
    [ORDER_STATUSES.PROCESSING]: 'warning',
    [ORDER_STATUSES.CANCELLED]: 'error'
};

// Status icons mapping
export const STATUS_ICONS = {
    [ORDER_STATUSES.DELIVERED]: 'DeliveredIcon',
    [ORDER_STATUSES.IN_TRANSIT]: 'ShippingIcon',
    [ORDER_STATUSES.PROCESSING]: 'PendingIcon',
    [ORDER_STATUSES.CANCELLED]: 'CancelIcon'
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount).replace('₹', '₹');
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: '2-digit'
    };

    return new Intl.DateTimeFormat('en-IN', { ...defaultOptions, ...options })
        .format(new Date(dateString));
};

/**
 * Calculate order total from bikes
 * @param {Array} bikes - Array of bike objects
 * @returns {number} Total order amount
 */
export const calculateOrderTotal = (bikes) => {
    return bikes.reduce((total, bike) => {
        return total + (bike.price * bike.quantity);
    }, 0);
};

/**
 * Check if order can be cancelled
 * @param {string} status - Order status
 * @returns {boolean} Whether order can be cancelled
 */
export const canCancelOrder = (status) => {
    return status === ORDER_STATUSES.PROCESSING;
};

/**
 * Check if order is active (not delivered or cancelled)
 * @param {string} status - Order status
 * @returns {boolean} Whether order is active
 */
export const isActiveOrder = (status) => {
    return ![ORDER_STATUSES.DELIVERED, ORDER_STATUSES.CANCELLED].includes(status);
};

/**
 * Generate tracking URL (placeholder implementation)
 * @param {string} orderId - Order ID
 * @returns {string} Tracking URL
 */
export const generateTrackingUrl = (orderId) => {
    return `/track-order/${orderId}`;
};

/**
 * Get days until delivery
 * @param {string} deliveryDate - Expected delivery date
 * @returns {number} Days until delivery (negative if overdue)
 */
export const getDaysUntilDelivery = (deliveryDate) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffTime = delivery - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Generate share URL for social media
 * @param {string} platform - Social media platform
 * @param {string} url - URL to share
 * @param {string} text - Share text
 * @returns {string} Share URL
 */
export const generateShareUrl = (platform, url, text = '') => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodedText} ${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    return shareUrls[platform.toLowerCase()] || url;
};

/**
 * Validate order data structure
 * @param {Object} order - Order object
 * @returns {boolean} Whether order data is valid
 */
export const validateOrderData = (order) => {
    const requiredFields = ['order_id', 'order_placed', 'total_amount', 'bikes'];
    const requiredBikeFields = ['bike_id', 'brand', 'model', 'price', 'status'];

    // Check required order fields
    for (const field of requiredFields) {
        if (!order[field]) return false;
    }

    // Check bikes array
    if (!Array.isArray(order.bikes) || order.bikes.length === 0) return false;

    // Check required bike fields
    for (const bike of order.bikes) {
        for (const field of requiredBikeFields) {
            if (!bike[field]) return false;
        }
    }

    return true;
};

/**
 * Filter orders by status
 * @param {Array} orders - Array of order objects
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered orders
 */
export const filterOrdersByStatus = (orders, status) => {
    if (!status) return orders;

    return orders.filter(order =>
        order.bikes.some(bike => bike.status === status)
    );
};

/**
 * Sort orders by date
 * @param {Array} orders - Array of order objects
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted orders
 */
export const sortOrdersByDate = (orders, direction = 'desc') => {
    return [...orders].sort((a, b) => {
        const dateA = new Date(a.order_placed);
        const dateB = new Date(b.order_placed);

        return direction === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

/**
 * Get order summary statistics
 * @param {Array} orders - Array of order objects
 * @returns {Object} Order statistics
 */
export const getOrderStats = (orders) => {
    const stats = {
        total: orders.length,
        processing: 0,
        inTransit: 0,
        delivered: 0,
        cancelled: 0,
        totalValue: 0
    };

    orders.forEach(order => {
        stats.totalValue += order.total_amount;

        order.bikes.forEach(bike => {
            switch (bike.status) {
                case ORDER_STATUSES.PROCESSING:
                    stats.processing++;
                    break;
                case ORDER_STATUSES.IN_TRANSIT:
                    stats.inTransit++;
                    break;
                case ORDER_STATUSES.DELIVERED:
                    stats.delivered++;
                    break;
                case ORDER_STATUSES.CANCELLED:
                    stats.cancelled++;
                    break;
            }
        });
    });

    return stats;
};