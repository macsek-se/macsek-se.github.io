# How to develop this web site

The web site is built using the Astro framework and it can be run using this
command:
```sh
npm install
npm run dev
```
To deploy the web site execute:

```sh
git push production
```

# How to renew SSL 

```sh
sudo certbot --nginx
sudo systemctl stop nginx
sudo certbot certonly --standalone -d mail.macsek.se
sudo systemctl start nginx
sudo systemctl restart postfix 
```
