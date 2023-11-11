import Redis from "ioredis";

type Result = {
  limit: number;
  remaining: number;
  success: boolean;
};

const rateLimiter = async (
  client: Redis,
  ip: string,
  limit: number,
  duration: number,
  route: string
): Promise<Result> => {
  try {
    const key = `rate_limit:${ip}/${route}`;
    let currentCount = await client.get(key);
    let count = parseInt(currentCount as string, 10) || 0;
    if (count >= limit) {
      return { limit, remaining: limit - count, success: false };
    }

    client.incr(key);
    client.expire(key, duration);
    return { limit, remaining: limit - (count + 1), success: true };
  } catch (err) {
    console.error(err);
  }
};

export default rateLimiter;
