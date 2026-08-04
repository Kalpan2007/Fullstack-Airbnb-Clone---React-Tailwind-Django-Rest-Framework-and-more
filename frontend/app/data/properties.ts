export type StaticProperty = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price_per_night: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  landlord: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

export const properties: StaticProperty[] = [
  {
    id: "1",
    title: "Property name",
    description:
      "Beautiful beach house with ocean views, perfect for a relaxing getaway.",
    image_url: "/beach_1.jpg",
    price_per_night: 200,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    landlord: {
      id: "1",
      name: "John Doe",
      avatar_url: "/profile_pic_1.jpg",
    },
  },
  {
    id: "2",
    title: "Property name",
    description:
      "Beautiful beach house with ocean views, perfect for a relaxing getaway.",
    image_url: "/beach_1.jpg",
    price_per_night: 200,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    landlord: {
      id: "1",
      name: "John Doe",
      avatar_url: "/profile_pic_1.jpg",
    },
  },
  {
    id: "3",
    title: "Property name",
    description:
      "Beautiful beach house with ocean views, perfect for a relaxing getaway.",
    image_url: "/beach_1.jpg",
    price_per_night: 200,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    landlord: {
      id: "1",
      name: "John Doe",
      avatar_url: "/profile_pic_1.jpg",
    },
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}
