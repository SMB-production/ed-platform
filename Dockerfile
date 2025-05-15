# Этап 1: Сборка Vite-проекта
FROM node:20-alpine AS build

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование исходников и сборка
COPY . .
RUN npm run build

# Этап 2: Сборка финального образа на базе nginx
FROM nginx:stable-alpine

# Удаляем стандартный конфиг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем собственный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d

# Копируем собранную статику из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
