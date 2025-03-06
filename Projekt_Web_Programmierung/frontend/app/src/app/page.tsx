import CustomerList from "./ui/customer-list";
import Head from "next/head";

export default function Home()
  {
    return (
      <div>
        <Head>
          <title>Prismarine Solutions</title>
          <meta name="description" content="Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen"></meta>
        </Head>
        <CustomerList></CustomerList>
      </div>
    );
  }

export function generateMetadata() {
  return {
    title: "Prismarine Solutions",
    description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
  };
}