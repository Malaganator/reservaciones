import { Config } from './conf/config';
import { ServerExpress } from './main';

let config = new Config();

let server = ServerExpress.init(
    config.appConfig.port,
    config.modo,
    config.allowsUrls
);

server.iniciarServidor(() => {
    console.log('Servidor iniciado en el puerto: ', config.appConfig.port);
});