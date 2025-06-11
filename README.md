# Дневник тренера — мобильное приложение

Привет! Это мой выпускной проект. Я разработала мобильное приложение для проекта **"Дневник тренера"**.  
Приложение помогает учителям физической кульутры и тренерам вести учет сдачи нормативов, сранивать результаты и вести статистику учеников.

## Стек

   - TypeScript
   - React Native 
   - Expo
   - gluestack-ui
   - Nativewind

## Установка и запуск на Android

1. Установи необходимые инструменты

   - Node.js (рекомендуется LTS-версия — Long-Term Support)
   - JDK (Java Development Kit) версии 11 или выше
   - Backend: https://github.com/screenviolence/CoachDiary-backend

2. Клонируй репозиторий

   ```
      git clone https://github.com/sobolmobol/coachdiary-mobile.git
      cd coachdiary-mobile
   ```
3. Установи зависимости

   ```
      npm install
   ```
4. Создай файл eas.json
```
{
  "cli": {
    "version": ">= 15.0.2",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_API_BASE": "YOUR_API",
        "EXPO_PUBLIC_CLIENT_ID": YOUR_CLIENT_ID"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
         "EXPO_PUBLIC_API_BASE": "YOUR_API",
         "EXPO_PUBLIC_CLIENT_ID": "YOUR_CLIENT_ID"
    }
        
    },
    "production": {
      "autoIncrement": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_API_BASE": "YOUR_API",
        "EXPO_PUBLIC_CLIENT_ID": "YOUR_CLIENT_ID"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

5. Установи eas-cli
```
   npm install -g eas-cli
```
6. Создай учетную запись Expo и войдите в системy
```
   eas login
```
7. Создай сборку для разработки
```
   eas build --platform android --profile development
```

## Документация

- [сборка для разработки](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo документация](https://docs.expo.dev/).
- [Изучите туториалы](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

Проект использует навигацию на основе файлов (https://docs.expo.dev/router/introduction).

