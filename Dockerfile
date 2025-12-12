FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test", "tests/test-screenPlay/login.spec.ts"]