import rateLimiter from "@/app/utils/rateLimiter";
import redisClient from "@/app/utils/redis";
import type { NextRequest } from "next/server";

type Params = {
  request: NextRequest;
  limitPerSecond: number;
  duration: number;
  endpoint: string;
};

export default async function getLimiterHeaders({
  request,
  limitPerSecond,
  duration,
  endpoint,
}: Params) {
  try {
    const requestIp = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    let headers = {};

    const result = await rateLimiter(
      redisClient,
      requestIp,
      limitPerSecond,
      duration,
      endpoint
    );

    headers["X-RateLimit-Limit"] = String(result.limit);
    headers["X-RateLimit-Remaining"] = String(result.remaining);
    headers["Content-Type"] = "application/json";

    return {
      limiter: result,
      headers,
    };
  } catch (err) {
    console.error(err);
  }
}
