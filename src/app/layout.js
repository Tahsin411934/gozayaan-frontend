import Header from "./components/Header/Header";
import "./globals.css";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>gozayaan</title>
      </head>
      <body>
   
        <Header/>

          {/* Main content */}
          <main className="p-6">{children}</main>
       
      </body>
    </html>
  );
}
