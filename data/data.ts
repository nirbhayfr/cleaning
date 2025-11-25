export const topCategories = [
	{
		key: "cleaning",
		title: "Cleaning Service",
		img: "/img/office-cleaning.jpg",
		cards: [
			{
				title: "Bathroom Cleaning",
				img: "/img/sub-bathroom.png",
			},
			{
				title: "Kitchen Cleaning",
				img: "/img/sub-kitchen.png",
			},
			{
				title: "Water Tank",
				img: "/img/sub-watertank.png",
			},
		],

		services: [
			{
				id: "SRV-HC-CLN-101",
				title: "Home Deep Cleaning Service",
				description:
					"A complete deep-cleaning solution for your home, including kitchen, bathrooms, bedrooms, living areas, fans, windows, and furniture dusting. Ideal for yearly deep cleaning or festival preparation.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 2499",
				discountPrice: "Rs 1999",
				quantity: 1,
				inStock: true,
				onSale: true,
				category: "cleaning-services",
				subcategory: "deep-cleaning",
				serviceRating: 4.7,
				reviews: [
					{
						user: "Rohan S.",
						rating: 5,
						comment: "Very professional team! They cleaned every corner thoroughly. Worth the money.",
						images: ["/img/kitchen-cleaning.jpg"],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-102",
				title: "Bathroom Deep Cleaning",
				description:
					"High-pressure cleaning of tiles, floors, glass, taps, showers, WC, and hard-water stain removal.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 999",
				discountPrice: "Rs 749",
				quantity: 1,
				inStock: true,
				onSale: true,
				category: "cleaning-services",
				subcategory: "bathroom-cleaning",
				serviceRating: 4.6,
				reviews: [
					{
						user: "Sneha Rao",
						rating: 5,
						comment: "My bathroom looks brand new! Hard-water stains gone completely.",
						images: [],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-103",
				title: "Kitchen Deep Cleaning",
				description:
					"Complete degreasing of chimney, tiles, stove, cabinets, and sink. Oil stains removed professionally.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 1499",
				discountPrice: "Rs 1199",
				quantity: 1,
				inStock: true,
				onSale: false,
				category: "cleaning-services",
				subcategory: "kitchen-cleaning",
				serviceRating: 4.8,
				reviews: [
					{
						user: "Harshita M",
						rating: 4.5,
						comment: "Great cleaning! My chimney and cabinets look spotless now.",
						images: [],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-104",
				title: "Sofa Shampoo & Cleaning",
				description:
					"Fabric and leather sofa cleaning using foam-treatment, vacuuming, and stain removal.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 1299",
				discountPrice: "Rs 999",
				quantity: 1,
				inStock: true,
				onSale: true,
				category: "cleaning-services",
				subcategory: "sofa-cleaning",
				serviceRating: 4.5,
				reviews: [
					{
						user: "Rajveer",
						rating: 4,
						comment: "Good service. My sofa feels fresh and clean.",
						images: [],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-105",
				title: "Carpet Deep Cleaning",
				description:
					"Full shampoo wash, stain removal, and vacuuming using industrial-grade carpet cleaners.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 799",
				discountPrice: "Rs 599",
				quantity: 1,
				inStock: true,
				onSale: false,
				category: "cleaning-services",
				subcategory: "carpet-cleaning",
				serviceRating: 4.4,
				reviews: [
					{
						user: "Naina K",
						rating: 4.5,
						comment: "Carpet looks fresh and soft again. Good value.",
						images: [],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-106",
				title: "Glass & Window Cleaning",
				description:
					"Professional window cleaning including frames, channels, and glass polishing.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 699",
				discountPrice: "Rs 499",
				quantity: 1,
				inStock: true,
				onSale: true,
				category: "cleaning-services",
				subcategory: "glass-cleaning",
				serviceRating: 4.3,
				reviews: [
					{
						user: "Kunal Gupta",
						rating: 5,
						comment: "Glass looks crystal clear. Very satisfied.",
						images: [],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-107",
				title: "Mattress Deep Cleaning",
				description:
					"Sanitization, dust-mite removal, shampooing, and deodorizing for all mattress types.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 1199",
				discountPrice: "Rs 899",
				quantity: 1,
				inStock: true,
				onSale: false,
				category: "cleaning-services",
				subcategory: "mattress-cleaning",
				serviceRating: 4.6,
				reviews: [
					{
						user: "Preeti",
						rating: 4.5,
						comment: "Mattress feels much fresher now. Great work!",
						images: [],
						videos: [],
					},
				],
			},

			{
				id: "SRV-HC-CLN-108",
				title: "Full Home Sanitization",
				description:
					"Hygiene sanitization using hospital-grade disinfectants. Covers all rooms and high-touch areas.",
				images: ["/img/kitchen-cleaning.jpg"],
				price: "Rs 999",
				discountPrice: "Rs 799",
				quantity: 1,
				inStock: true,
				onSale: true,
				category: "cleaning-services",
				subcategory: "sanitization",
				serviceRating: 4.7,
				reviews: [
					{
						user: "Arjun Mehta",
						rating: 5,
						comment: "Quick service and very professional. Recommended!",
						images: [],
						videos: [],
					},
				],
			},
		],
	},
	{
		key: "fullhouse",
		title: "Full House Cleaning",
		img: "/img/banner-2.jpg",
		cards: [
			{
				title: "1 BHK Deep Clean",
				img: "/img/small-house.jpg",
			},
			{
				title: "2 BHK Deep Clean",
				img: "/img/medium-house.jpg",
			},
			{
				title: "3 BHK Deep Clean",
				img: "/img/large-house.jpeg",
			},
		],
	},
	{
		key: "commercial",
		title: "Commercial Cleaning",
		img: "/img/commercial-cleaning.jpg",
		cards: [
			{
				title: "Hospital Cleaning",
				img: "/img/sub-hospital.png",
			},
			{
				title: "School Cleaning",
				img: "/img/sub-school.png",
			},
			{
				title: "Temple Cleaning",
				img: "/img/sub-temple.png",
			},
			{
				title: "Garden Cleaning",
				img: "/img/sub-garden.png",
			},
			{
				title: "Shop Cleaning",
				img: "/img/sub-shop.png",
			},
			{
				title: "Factory Cleaning",
				img: "/img/sub-factory.png",
			},
			{
				title: "College Cleaning",
				img: "/img/sub-college.png",
			},
			{
				title: "ETS Cleaning",
				img: "/img/sub-ets.png",
			},
		],
	},
];
