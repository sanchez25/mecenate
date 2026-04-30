## Запуск проекта

1. Установить зависимости

   npm install

2. Запустить проект

   npx expo start

3. Открыть

   через Expo Go (QR-код)
   Android: нажать a
   iOS: нажать i

4. Создайте `.env` файл (в качестве примера добавлен .env.example):

   EXPO_PUBLIC_API_TOKEN=your_token

5. MobX используется для клиентского UI-state: выбранный фильтр ленты хранится в feedStore. Серверные данные остаются в React Query, так как это cache/server-state.

6. NEW UPDATE:

   6.1 WebSocket-клиент вынесен в отдельный lifecycle-aware класс с reconnect, exponential backoff, cleanup при unmount и безопасной обработкой входящих сообщений.

   6.2 MobX теперь используется для клиентского UI-state: фильтр ленты, состояние ручного refresh и состояние comment input. Серверное состояние оставлено в React Query, так как оно отвечает за cache/server-state, pagination, mutations и invalidation.