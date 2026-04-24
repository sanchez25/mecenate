const TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

export function createAppWebSocket() {
    return new WebSocket(`wss://k8s.mectest.ru/test-app/ws?token=${TOKEN}`);
}