# Usa imagem base leve com Node.js
FROM node:20-alpine

# Instala dependências para build do bcrypt (e outras libs nativas)
RUN apk add --no-cache build-base python3

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (isso ajuda com o cache do Docker)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Agora copia o restante da aplicação
COPY . .

# Expõe a porta usada pelo app
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
