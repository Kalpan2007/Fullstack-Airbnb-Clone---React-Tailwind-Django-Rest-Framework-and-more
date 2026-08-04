import PropertyListItem from "./PropertyListItem";
import { properties } from "@/app/data/properties";

const PropertyList = () => {
  return (
    <>
      {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </>
  );
};

export default PropertyList;
