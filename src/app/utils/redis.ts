import Redis from "ioredis";

type RedisOptions = {
  host: string;
  password: string;
  port: number;
};

const option: RedisOptions = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
};

const redisClient = new Redis(option);
export default redisClient;
