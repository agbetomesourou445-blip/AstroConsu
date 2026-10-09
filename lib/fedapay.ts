import { FedaPay } from "fedapay";

let configured = false;

export function configureFedaPay() {
  const secret = process.env.FEDAPAY_SECRET_KEY;
  const environment = process.env.FEDAPAY_ENV === "live" ? "live" : "sandbox";

  if (!secret) {
    throw new Error("FEDAPAY_SECRET_KEY n'est pas configurée.");
  }

  if (!configured) {
    FedaPay.setApiKey(secret);
    FedaPay.setEnvironment(environment);
    configured = true;
  }

  return { environment };
}

export function getAppUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) throw new Error("NEXT_PUBLIC_APP_URL n'est pas configurée.");
  return url.replace(/\/$/, "");
}
