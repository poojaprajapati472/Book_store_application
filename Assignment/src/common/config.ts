import * as dotenv from 'dotenv'
export const APP_CONSTANTS = {
  DEV: 'dev',
  QA: 'qa',
  LOCAL: 'local',
}

export let appConfig = {
  env: {
    MONGODB_URL:process.env.MONGODB_URL,
    PORT:process.env.PORT ,
    MAIL_USER:process.env.MAIL_USER,
    MAIL_PASSWORD:process.env.MAIL_PASSWORD,
    SECRET_KEY:process.env.SECRET_KEY || "",
    SECRET_KEY_s:process.env.SECRET_KEY_s || ""


  },
}
switch (process.env.NODE_ENV) {
  case 'local':
    dotenv.config({ path: '.env.local' })
    appConfig = {
      env: {
        MONGODB_URL:process.env.MONGODB_URL,
        PORT:process.env.PORT ,
        MAIL_USER:process.env.MAIL_USER,
        MAIL_PASSWORD:process.env.MAIL_PASSWORD,
        SECRET_KEY:process.env.SECRET_KEY || "",
        SECRET_KEY_s:process.env.SECRET_KEY_s || ""
      },
    }
    break
  case 'qa':
    dotenv.config({ path: '.env.qa' })
    break
  default:
    dotenv.config({ path: '.env.dev' })
    break
}
export default appConfig;