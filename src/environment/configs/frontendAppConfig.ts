import { FrontendAppConfig } from '../environment-types.interface';

export const frontendAppConfig = () => ({
  frontendApp: {
    url: process.env.FRONTEND_APP_URL,
  } as FrontendAppConfig,
});
