import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyProps {
    property: PropertyType,
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    markFavorite
}) => {
    const router = useRouter();

    return (
        <div 
            className="cursor-pointer"
            onClick={() => router.push(`/properties/${property.id}`)}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl bg-gray-200">
                {property.image_url ? (
                    <Image
                        fill
                        src={property.image_url}
                        sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                        className="hover:scale-110 object-cover transition h-full w-full"
                        alt="Beach house"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-12 h-12 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                            />
                        </svg>
                    </div>
                )}

                {markFavorite && (
                    <FavoriteButton
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={(is_favorite) => markFavorite(is_favorite)}
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
            </div>
        </div>
    )
}

export default PropertyListItem;
