
FROM nginx:latest

RUN apt update
RUN apt install certbot -y && apt install python3-certbot-nginx -y
COPY "./default.conf" "/etc/nginx/conf.d/"
copy "./start-nginx.sh" "/"
#/etc/nginx/conf.d/default.conf

#RUN certbot --nginx -d liftoff.mywire.org -m d.naddi.96@gmail.com  --agree-tos -n
RUN chmod a+x start-nginx.sh
CMD ["./start-nginx.sh"]

#certbot certonly --standalone -d liftoff.mywire.org -m d.naddi.96@gmail.com  --agree-tos -n && sleep 3 && certbot --nginx -d liftoff.mywire.org -m d.naddi.96@gmail.com  --agree-tos -n && sleep 3 && nginx -g 'daemon off;'