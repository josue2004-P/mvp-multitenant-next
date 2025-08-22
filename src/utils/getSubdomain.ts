type AuthRequest = {
  headers: Pick<Headers, "get"> & { [key: string]: string | undefined };
  body?: any;
  query?: any;
  method?: string;
};

export function getSubdomainServer(req: AuthRequest): string | null {
  const host =
    typeof req.headers.get === "function"
      ? req.headers.get("host")
      : req.headers["host"];

  if (!host) return null;

  const subdomain = host.split(".")[0];
  return subdomain === "admin" ? subdomain : null;
}
