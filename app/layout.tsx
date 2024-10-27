import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto p-4">
          <header className="text-center py-4">
            <h1 className="text-4xl font-bold">Spend Elon Musk's Money</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
