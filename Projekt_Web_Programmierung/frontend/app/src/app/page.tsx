import OfferList from "./ui/offer-list"; // Importiert die OfferList-Komponente um component driven architecture zu verwenden

export default function Home()
  {
    return (
      <div>
        <OfferList></OfferList>
      </div>
    );
  }

export function generateMetadata() { // Funktion für die Metadaten, damit die Seite im Browser korrekt heißt
  return {
    title: "Prismarine Solutions",
    description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
  };
}