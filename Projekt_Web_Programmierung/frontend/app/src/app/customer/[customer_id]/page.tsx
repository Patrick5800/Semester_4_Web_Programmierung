import CustomerDetailed from '../../ui/customer-detailed';

export default async function CustomerPage({
    params,
}:{
    params: Promise <{customer_id: number}>
}) {
    const { customer_id } = await params;

    return  (
        <div>
            <CustomerDetailed customer_id={customer_id}></CustomerDetailed>
        </div>
    );
}

export function generateMetadata() {
    return {
      title: "Prismarine Solutions",
      description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
    };
}