# Running Express Server 
Instructions to run the app on a linux server.

>**This is not a drag and drop project, it's just a blueprint. You need to modify the project logic to handle your own underlying service and how you store your data.**

## Instructions
```
git clone https://github.com/ahmed-fawzy99/earlybird-license-server.git
cd earlybird-license-server
```
Go to `.env` and set your `PARTNER_API_KEY`.

### Docker
- Run the following command to build the docker image:
```bash
docker build -t earlybird-license-server . && \
docker run -v $(pwd):/app -d -p 2604:2604 --restart always --name earlybird-license-server earlybird-license-server
```

### Without Docker
```bash
npm install
npm run set-api-key
npm start
```

# Setting Earlybird API Key
Earlybird cannot communicate with the server without an API key. 
We set the API key in the installation process using the command `npm run set-api-key`.

To change the API key at any point, you can run the following commands:

## Docker
```bash
docker exec earlybird-license-server npm run set-api-key
```

## Without Docker
```bash
npm run set-api-key
```
