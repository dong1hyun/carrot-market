import { unstable_cache as nextCache } from "next/cache";
import db from "./db";
import getSession from "./session";

export function formatToTimeAgo(date: string) {
    const dayInMs = 1000 * 60 * 60 * 24;
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = Math.round((time - now) / dayInMs);
  
    const formatter = new Intl.RelativeTimeFormat("ko");
  
    return formatter.format(diff, "days");
  }

export function formatToWon(price:number) {
    return price.toLocaleString('ko-KR');
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
      where: {
          id
      },
      include: {
          user: {
              select: {
                  username: true,
                  avatar: true,
              }
          }
      },
  });
  return product;
}

export const getCachedProduct = (id: number) => nextCache(() => getProduct(id), [`productDetail-${id}`], {tags: [`productDetail-${id}`]});