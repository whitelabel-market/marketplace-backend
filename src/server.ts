import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { authResolver } from '@resolvers/auth.resolver';
import { userResolver } from '@resolvers/users.resolver';
import { orderResolver } from '@resolvers/order.resolver';

validateEnv();

const app = new App([authResolver, userResolver, orderResolver]);

app.listen();
