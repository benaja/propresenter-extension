import {
  churchtoolsClient,
  activateLogging,
} from "@churchtools/churchtools-client";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";
import { store, type StoreType } from "../../store";

churchtoolsClient.setCookieJar(
  axiosCookieJarSupport.wrapper,
  new tough.CookieJar()
);

export const useChurchToolsClient = () => {
  const settings = store.get("settings") as StoreType["settings"];

  churchtoolsClient.setBaseUrl(settings.churchtoolsUrl);

  if (process.env.NODE_ENV === "development") {
    activateLogging();
  }

  let isLoggedIn = false;

  async function login() {
    await churchtoolsClient.post("/login", {
      username: settings.churchtoolsUser,
      password: settings.churchtoolsPassword,
    });
    isLoggedIn = true;
  }

  async function ensureLoggedIn() {
    if (!isLoggedIn) {
      await login();
    }
  }

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
