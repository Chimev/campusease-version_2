export const redirectToLogin = () => {
    const currentUrl = window.location.pathname + window.location.search;
    const loginUrl = `sign-in?callbackUrl=${encodeURIComponent(currentUrl)}`;
    window.location.href = loginUrl;
};