import "./globals.css";

export const metadata = {
  title: "Letter Sender",
  description: "Send a beautiful letter to someone special.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
