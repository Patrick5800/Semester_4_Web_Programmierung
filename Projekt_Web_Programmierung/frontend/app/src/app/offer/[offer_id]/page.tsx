import OfferDetailed from '../../ui/offer-detailed';

export default async function OfferPage({
    params,
}:{
    params: Promise <{offer_id: number}>
}) {
    const { offer_id } = await params;

    return  (
        <div>
            <OfferDetailed offer_id={offer_id}></OfferDetailed>
        </div>
    );
}