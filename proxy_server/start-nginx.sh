export DOLLAR="$"
envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
echo 'SHELL=/bin/sh 
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin 
0 */12 * * * root certbot renew -q --post-hook "service nginx reload"' > /etc/cron.d/certbot
/etc/init.d/cron start


if [ -f "/etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem" ]; then
    nginx -g 'daemon off;'
else 
    certbot certonly --standalone -d $DOMAIN_NAME -m $EMAIL  --agree-tos -n
    nginx -g 'daemon off;'
fi