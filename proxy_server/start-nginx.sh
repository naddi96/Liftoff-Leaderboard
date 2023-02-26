
if [ -f "/etc/letsencrypt/live/l.liftoff.mywire.org/fullchain.pem" ]; then
    nginx -g 'daemon off;'
else 
    certbot certonly --standalone -d l.liftoff.mywire.org -m d.naddi.96@gmail.com  --agree-tos -n
    certbot --nginx -d l.liftoff.mywire.org -m d.naddi.96@gmail.com  --agree-tos -n
fi




