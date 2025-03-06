import OfferDetailed from '../../ui/offer-detailed';
import CommentList from "../../ui/comment-list";

export default async function OfferPage({
    params,
}:{
    params: Promise <{offer_id: number}>
}) {
    const { offer_id } = await params;

    return  (
        <div>
            <OfferDetailed offer_id={offer_id}></OfferDetailed>
            <CommentList offer_id={offer_id}></CommentList>
        </div>
    );
}

export function generateMetadata() {
    return {
      title: "Prismarine Solutions",
      description: "Prismarine Solutions - Ihr Partner für individuelle Softwarelösungen",
    };
}

