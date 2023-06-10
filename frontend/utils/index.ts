export const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const timeSinceCreated = (date: string): string => {
    const currentTime = new Date();
    const createdTime = new Date(date);
    const timeDiff = currentTime.getTime() - createdTime.getTime();

    // Calculate time components
    const miliseconds = Math.floor(timeDiff);
    const seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Return time since created
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds > 0) {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
};

export const sortByCreatedAt = (items: any[]): any => {
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
