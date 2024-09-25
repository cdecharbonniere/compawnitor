import "../styles/globals.css";
// import localFont from "next/font/local";

// const myLocalFont = localFont({
//   src: [
//     {
//       path: '/fonts/GeistVF.woff',
//       variable: "--font-geist-sans",
//       weight: "100 900",
//       style: "normal"
//     },
//     {
//       path: '/fonts/GeistMonoVF.woff',
//       variable: "--font-geist-mono",
//       weight: "100 900",
//       style: "normal"
//     }
//   ]
// });

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

