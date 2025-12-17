

\\ клонирование репозитория \\ 
``git clone {ссылка}``
``cd {папка проекта}``

\\ с нуля \\
придется самому создавать структуру, в зависимости от проекта

\\ установка zависимиостей \\
чистая установка всех зависимостей:
``npm ci``
``npm install --save-dev @types/node``

\\ устанавливает все нужные браузеры для тестов: \\
``npx playwright install --with-deps ``

\\ установка Faker.js для генерации случайных данных \\
``npm install @faker-js/faker``
Используется для генерации случайных имени пользователя и пароля в тестах.

\\ установка  Node.js (для TypeScript) \\
``npm install --save-dev @types/node``




\\ cоздание файла .env с переменными: \\
.env
APP_URL=..
API_USERNAME=..

на гите можно поставить секретку (Settings → Secrets → Actions → New repository secret)

\\если используем локальный .env \\
``import 'dotenv/config';`` - импорт в коде, где используем переменные

\\ создание tsconfig.json (если его нет) - дефолт настройки \\
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"],
    "strict": true,
    "outDir": "dist"
  },
  "include": ["**/*.ts"]
}


\\ запуск тестов \\
``npx playwright test``


\\ запуск конкретного теста \\
``npx playwright test tests/auth-tests.spec.ts``

\\ запуск тестов с дебагом \\
``npx playwright test --debug``


\\ CI/CD (GitHub Actions) \\
Файл workflow расположен в корне репозитория - .github/workflows/{file}.yml.



\\playwright.config.ts\\
retries: process.env.CI ? 1 : 0 ``тесты перезапускаются один раз если упали, локально 0``

workers: process.env.CI ? 3 : 3 ``воркеры - 3 локально 3 на ci - чтоб быстрее тесты проходили``

{
  name: 'chromium',
  use: { ...devices['Desktop Chrome'] },  ``браузеры где тесты проходят``
},

\\.gitignore\\
добавляем весь мусор который ГИТ не будет отслеживать - пушить в нашу ветку

\\ *\tests \\
тут все тесты с названиями вроде ``{name}.spec.ts`` / ``{name}.test.ts``

\\ *\src \\
все основные файлы проекта


\\git\\
git switch -c {name} ``меняем ветку на ново-созданную с нужным названием``
git add {что-то} ``добавляем то что собираемся пушить в гит``
git commit -m "123" ``коммитим сообщение для последующего пуша на гит``
git push origin {название ветки} ``пушим``

потом на гихтабе делаем пул реквест и ждъём оукей