import {
  churchtoolsClient,
  activateLogging,
} from "@churchtools/churchtools-client";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import dotenv from "dotenv";

churchtoolsClient.setCookieJar(
  axiosCookieJarSupport.wrapper,
  new tough.CookieJar()
);
churchtoolsClient.setBaseUrl(dotenv.config().parsed.CHURCHTOOLS_URL);

activateLogging();

export const client = churchtoolsClient;

let isLoggedIn = false;

async function login() {
  await churchtoolsClient.post("/login", {
    username: dotenv.config().parsed.CHURCHTOOLS_USER,
    password: dotenv.config().parsed.CHURCHTOOLS_PASSWORD,
  });
  isLoggedIn = true;
}

async function ensureLoggedIn() {
  if (!isLoggedIn) {
    await login();
  }
}

export const useChurchToolsClient = () => {
  return {
    async get(...args: Parameters<typeof churchtoolsClient.get>) {
      await ensureLoggedIn();

      return churchtoolsClient.get(...args);
    },
    async post(...args: Parameters<typeof churchtoolsClient.post>) {
      await ensureLoggedIn();

      return churchtoolsClient.post(...args);
    },
    async put(...args: Parameters<typeof churchtoolsClient.put>) {
      await ensureLoggedIn();

      return churchtoolsClient.put(...args);
    },
    async patch(...args: Parameters<typeof churchtoolsClient.patch>) {
      await ensureLoggedIn();

      return churchtoolsClient.patch(...args);
    },
    async deleteApi(...args: Parameters<typeof churchtoolsClient.deleteApi>) {
      await ensureLoggedIn();

      return churchtoolsClient.deleteApi(...args);
    },
    async oldApi(...args: Parameters<typeof churchtoolsClient.oldApi>) {
      await ensureLoggedIn();

      return churchtoolsClient.oldApi(...args);
    },
  };
};
