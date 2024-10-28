FROM ubuntu:20.04
RUN apt update
RUN apt install -y tzdata
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - 
RUN apt install -y nodejs

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
