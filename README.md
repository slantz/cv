# cv
My CV single-page application.

- run `npm install` to download dependencies
> You may face permissions issues under Linux systems, so make sure that node is installed under /opt/ folder and run `npm i --unsafe-perm` instead.

## Production build
- run `npm run dist` to build assets
- run `NODE_ENV=production npm start` to start the node express server

## Development build
- run `npm run dist` to build assets
- run `npm start` to start the node express server

or alternatively just
- run `npm start` to start the node express server and to precompile assets with webpack

## Playground route
- run `NODE_ENV=production npm start` to start the node express server
- visit `https://yourhost/playground`

## Create nginx authentication for specific route like `/playground`
- Create password file `sudo sh -c "echo -n '$(whoami):' >> /etc/nginx/.htpasswd"`
- Set password `sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"`
- Update nginx config
```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html;
    index index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
        auth_basic "Restricted Content";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```
- Restart nginx `sudo service nginx restart`.
