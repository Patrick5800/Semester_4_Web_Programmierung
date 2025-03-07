import CreateCustomer from '../../ui/create-customer';

export default async function CreateOfferPage()
{
    return (
        <div>
            <CreateCustomer></CreateCustomer>
        </div>
    );
}

export function generateMetadata() {
    return {
      title: "Prismarine Solutions",
      description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
    };
}