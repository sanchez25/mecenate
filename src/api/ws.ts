const TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export function getWebSocketUrl() {
    return `wss://k8s.mectest.ru/test-app/ws?token=${TOKEN}`; 
}