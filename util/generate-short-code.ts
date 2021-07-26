export const generateShortCode = (length: number): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortCode = '';
    for (let i = 0; i < length; i++) {
        shortCode += chars[Math.floor(Math.random() * chars.length)];
    }
    return shortCode;
}
