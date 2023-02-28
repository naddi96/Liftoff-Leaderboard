FROM nginx:latest
RUN apt update
RUN apt install cron -y
RUN apt install certbot -y
RUN apt install python3-certbot-nginx -y
COPY "./default.conf.template" "/etc/nginx/conf.d/"
COPY "./start-nginx.sh" "/"
RUN chmod a+x start-nginx.sh
CMD ["./start-nginx.sh"]