import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

const adminStatusVerification = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user?.isAdmin;
  } catch (err) {
    return false;
  }
};

export default adminStatusVerification;
