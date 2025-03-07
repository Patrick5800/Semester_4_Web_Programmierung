import CreateOffer from '../../ui/create-offer';


export default async function CreateOfferPage()
{
    return (
        <div>
            <CreateOffer></CreateOffer>
        </div>
    );
}

export function generateMetadata() {
    return {
      title: "Prismarine Solutions",
      description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
    };
}