import "../globals.css";
import { Poppins } from "next/font/google";
import MUIDrawer from "../components/Drawer/Drawer";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return redirect("/");
  }

  return (
    <>
      <html lang="pl">
        <body className={poppins.className}>
          <Toaster position="bottom-right" />
          <MUIDrawer>{children}</MUIDrawer>
        </body>
      </html>
    </>
  );
}
