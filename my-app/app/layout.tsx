import "./globals.css";

export const metadata = {
  title: 'Penny Wise',
  description: 'Personal finance dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-mono ">
      <head>
        <link
        precedence="default"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#ffffff] bg-[url('ag-square.png')] bg-repeat">
        {children}
      </body>
    </html>
  );
}
