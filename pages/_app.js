import "@/styles/globals.css";
import { Layouts } from "@/components/Layouts";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: {session,...pageProps} }) {
  return (
   <SessionProvider session={session}>
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
   </SessionProvider>
  )
}