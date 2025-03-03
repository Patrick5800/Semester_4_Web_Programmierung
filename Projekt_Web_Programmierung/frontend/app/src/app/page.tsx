import CustomerList from "./ui/customer-list";

export default function Home()
  {
    return (
      <div>
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