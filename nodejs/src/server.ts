import 'dotenv/config';
import '@/index';
import App from '@/app';

import { IndexController } from '@/controllers/indexController';
import { ApiController } from '@/controllers/apiController';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([IndexController, ApiController]);
app.listen();
