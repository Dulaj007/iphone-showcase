import "./globals.css";
//import Cursor from "@/components/ui/cursor";
import Navbar from "@/components/partials/navBar";
import Footer from "@/components/partials/footer";

export const metadata = {
  title: "iPhone Showcase",
  description: "Next.js 3D iPhone showcase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
   
        <Navbar />
        {children}
 
      </body>
    </html>
  );
}
