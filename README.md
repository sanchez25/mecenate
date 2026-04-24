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