

export class Config {
    private _appConfig: any;
    private _db: any;
    private _keys: any;
    private _allows_urls: string[];
    private _modo: string;
    private _token_secreto: string;

    constructor(){
        this._modo = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
        switch (this._modo) {
            case 'dev':
                console.log('En modo desarrolo');
                this.desarrollo();
                break;
            case 'prod':
                console.log('En modo Produccion');
                this.produccion();
                break;        
            default:
                console.log('No se encontró un modo se pasará a desarrolo');
                this.desarrollo();
                break;
        }
    }

    get appConfig(){
        return this._appConfig;
    }

    get db(){
        return this._db;
    }

    get keys(){
        return this._keys;
    }

    get allowsUrls(){
        return this._allows_urls;
    }

    get modo(){
        return this._modo
    }

    get tokenSecreto(){
        return this._token_secreto;
    }
    private desarrollo(){
        this._appConfig = {port : 5000};
        this._db = {
            host: 'localhost',
            port: 3306,
            database: 'reservaciones',
            username: 'root',
            password: '1234',
            dialect: 'mysql'
        }

        this._keys = {
            facebook: {

            },
            google: {

            },

            twitter: {

            }
        }

        this._allows_urls = ['http://localhost:4200', 'http://lvh.me:4200'] 
        
        this._token_secreto = 'zukulencia';
    }

    private produccion(){
        this._appConfig = {port : 5000};
        this._db = {
            host: 'localhost',
            port: 3306,
            database: 'reservaciones',
            username: 'root',
            password: '1234',
            dialect: 'mysql'
        }

        this._keys = {
            facebook: {

            },
            google: {

            },

            twitter: {

            }
        }

        this._allows_urls = ['http://localhost:4200', 'http://lvh.me:4200'] 
        
        this._token_secreto = 'zukulencia';
    }
}