const DEMO_UUID = "550e8400-e29b-41d4-a716-446655440000";

export function createAppWebSocket() {
    return new WebSocket(`wss://k8s.mectest.ru/test-app/ws?token=${DEMO_UUID}`);
}