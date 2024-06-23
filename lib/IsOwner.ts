import getSession from "./session";

export async function isProductOwner(userId:number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }
    return false;
  }