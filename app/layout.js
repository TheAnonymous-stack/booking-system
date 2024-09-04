import "./globals.css";
import Navbar from '../components/navbar';
import SessionWrapper from '../components/sessionWrapper';

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrapper>
    
  );
}
