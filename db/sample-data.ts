const sampleData = {
    users: [
      {
        name: 'John',
        email: 'admin@example.com',
        password: '123456',
        role: 'admin',
      },
      {
        name: 'Jane',
        email: 'user@example.com',
        password: '123456',
        role: 'user',
      },
    ],
    products: [
      {
        name: '11-inch Ipad Pro',
        slug: '11-inch-ipad-pro-512gb-space-gray',
        category: "iPad",
        description: '11-inch Ipad Pro 512gb Space Gray',
        images: [
          '/images/products/11-inch-ipad-pro-512gb-space-gray.png',
          '/images/products/11-inch-ipad-pro-512gb-space-gray.png',
        ],
        price: 900.99,
        brand: 'Apple Inc.',
        rating: 4.5,
        numReviews: 10,
        stock: 5,
        isFeatured: true,
        banner: '/images/banner-1.jpg',
      },
      {
        name: '13-inch Macbook Air',
        slug: '13-inch-macbook-air-256gb-space-gray',
        category: "Mac",
        description: '13-inch Macbook Air 256gb Space Gray',
        images: [
          '/images/products/13-inch-macbook-air-256gb-space-gray.png',
          '/images/products/13-inch-macbook-air-256gb-space-gray.png',
        ],
        price: 1300.9,
        brand: 'Apple Inc.',
        rating: 4.2,
        numReviews: 8,
        stock: 10,
        isFeatured: false,
        banner: null,
      },
      {
        name: 'AirPods Pro 2nd generation',
        slug: 'airpods-pro-2nd-generation',
        category: "AirPods",
        description: 'AirPods Pro 2nd generation',
        images: [
          '/images/products/airpods-pro-2nd-generation.png',
          '/images/products/airpods-pro-2nd-generation.png',
        ],
        price: 699.95,
        brand: 'Apple Inc.',
        rating: 4.9,
        numReviews: 3,
        stock: 0,
        isFeatured: false,
        banner: null,
      },
      {
        name: 'Apple Watch series-9',
        slug: 'apple-watch-series-9-aluminum',
        category: "Watch",
        description: 'Apple Watch series-9 aluminum',
        images: [
          '/images/products/apple-watch-series-9-aluminum.png',
          '/images/products/apple-watch-series-9-aluminum.png',
        ],
        price: 890.95,
        brand: 'Apple Inc.',
        rating: 3.6,
        numReviews: 5,
        stock: 10,
        isFeatured: false,
        banner: null,
      },
      {
        name: 'Adjustable Laptop Riser',
        slug: 'silver-lamicall-adjustable-laptop-riser',
        category: "Accessories",
        description: 'Silver lamicall adjustable Laptop Riser',
        images: [
          '/images/products/silver-lamicall-adjustable-laptop-riser.png',
          '/images/products/silver-lamicall-adjustable-laptop-riser.png',
        ],
        price: 79.99,
        brand: 'Apple Inc.',
        rating: 4.7,
        numReviews: 18,
        stock: 6,
        isFeatured: false,
        banner: null,
      },
      {
        name: 'Apple Pencil 1st-generation',
        slug: 'apple-pencil-1st-generation',
        category: "Accessories",
        description: 'Apple Pencil 1st-generation',
        images: [
          '/images/products/apple-pencil-1st-generation.png',
          '/images/products/apple-pencil-1st-generation.png',
        ],
        price: 99.99,
        brand: 'Apple Inc.',
        rating: 4.6,
        numReviews: 12,
        stock: 8,
        isFeatured: false,
        banner: null,
      },
      {
        name: 'iPhone 15 pro',
        slug: 'apple-iphone-15-pro-1tb-blue-titanium',
        category: "iPhone",
        description: 'iPhone 15 pro 1tb blue-titanium',
        images: [
          '/images/products/apple-iphone-15-pro-1tb-blue-titanium.png',
          '/images/products/apple-iphone-15-pro-1tb-blue-titanium.png',
        ],
        price: 800.99,
        brand: 'Apple Inc.',
        rating: 4.8,
        numReviews: 10,
        stock: 9,
        isFeatured: true,
        banner: '/images/banner-2.jpg',
      },
    ],
  };
  
  export default sampleData;