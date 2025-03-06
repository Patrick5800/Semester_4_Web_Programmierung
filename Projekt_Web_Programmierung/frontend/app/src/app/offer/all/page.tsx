import OfferList from "../../ui/offer-list";

export default function OfferPage() {
  return (
    <div>
      <OfferList></OfferList>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Prismarine Solutions",
    description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
  };
}