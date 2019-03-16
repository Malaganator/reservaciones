import express from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import subdomain from 'express-subdomain';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import path from 'path';

import { UsuarioRutas } from './http';


interface ConfigCors {
	origin?: boolean | string | RegExp | Array<string> | Function,
	methods?: Array<string>,
	allowedHeaders?: Array<string>,
	credentials?: boolean,
	maxAge?: number,
	preflightContinue?: boolean,
	optionsSuccessStatus?: number
};

export class ServerExpress {
	private app: express.Application;
	private port: number;
	private modo: string;
	private allows_urls: string[];

	constructor(port: number, modo: string, allow_urls: string[]) {
		this.app = express();
		this.port = port;
		this.modo = modo;
		this.allows_urls = allow_urls;
		this.config();
		this.rutas();
	}

	public static init(port: number, modo: string, allow_urls: string[]) {
		return new ServerExpress(port, modo, allow_urls);
	}

	public iniciarServidor(callback: Function) {
		this.app.listen(process.env.PORT || this.port, callback);
	}

	private config() {
		this.app.use(cors(this.configCors()));
		this.app.use(bodyParser.json({ limit: '50mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
		this.app.use(cookieParser());
		this.app.use(session({
			secret: 'lalocal30005000805',
			resave: true,
			saveUninitialized: true
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		morgan('combined', {
			skip: function (req, res) {
				return res.statusCode < 400}
			}
		);		
	}

	private rutas() {

		this.app.use(new UsuarioRutas().ruteador);


	}

	private configCors() {
		let cors: ConfigCors = {
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: [
				'Origin',
				'X-Requested-With',
				'Content-Type',
				'Accept',
				'x-client-key',
				'x-client-token',
				'x-client-secret',
				'Authorization'
			],
			credentials: true,
		}

		switch (this.modo) {
			case 'dev':
				cors.origin = '*'
				break;
			case 'prod':
				cors.origin = (origin, callback) => {
					if (this.allows_urls.indexOf(origin) !== -1) {
						callback(null, true)
					} else {
						callback('Not allowed by CORS')
					}
				}
				break;
			default:
				cors.origin = '*'
				break;
		};

		return cors;
	}	
}