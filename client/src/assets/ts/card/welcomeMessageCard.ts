export const WelcomeMessageCard = (firstName: string) => {
    return `
        Welcome back, ${firstName || "User"}!`;
};
