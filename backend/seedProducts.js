const mongoose = require('mongoose')
const Product = require('./models/Product') // adjust path if needed
const dotenv = require('dotenv')
dotenv.config()

const MONGO_URI = process.env.MONGO_URI  // change DB name

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    // Optional: clear existing products collection — use carefully
    await Product.deleteMany({});
    console.log('Cleared existing products')

    const products = [
      {
        name: 'Basic White T-Shirt',
        description: 'Classic white cotton t-shirt — comfortable & versatile.',
        price: 299,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764485213/jeremy-mcgilvrey-20oegq2JDYU-unsplash_wkmcee.jpg',
        category: 'T-Shirt',
        sizes: ['S','M','L','XL'],
        stock: 100
      },
      {
        name: 'Black Graphic Tee',
        description: 'Black t-shirt with cool graphic print on front.',
        price: 349,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764489048/11639276_1_ctevtz.jpg',
        category: 'T-Shirt',
        sizes: ['S','M','L'],
        stock: 80
      },
      {
        name: 'Grey Hoodie',
        description: 'Soft fleece grey hoodie — perfect for winter.',
        price: 1299,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764489186/young-adult-exercising-home_evguiy.jpg',
        category: 'Hoodie',
        sizes: ['S','M','L','XL'],
        stock: 50
      },
      {
        name: 'Red Hoodie',
        description: 'Bright red hoodie, cozy and warm.',
        price: 1399,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764489291/happy-handsome-brutal-bearder-man-wearing-warm-red-winter-trendy-fleece-hoodie_v0vhkz.jpg',
        category: 'Hoodie',
        sizes: ['M','L','XL'],
        stock: 40
      },
      {
        name: 'Blue Denim Jeans',
        description: 'Regular fit blue denim jeans, durable.',
        price: 999,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764489621/alex-pshenianykov-tn1fZMusweE-unsplash_ejhi4r.jpg',
        category: 'Jeans',
        sizes: ['30','32','34','36'],
        stock: 70
      },
      {
        name: 'Slim Fit Black Jeans',
        description: 'Slim fit black jeans — modern look.',
        price: 1099,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764489793/robiul-islam-pailot-JD_o9Ytxuic-unsplash_aklfjl.jpg',
        category: 'Jeans',
        sizes: ['30','32','34'],
        stock: 60
      },
      {
        name: 'Leather Jacket',
        description: 'Genuine leather jacket — rugged and stylish.',
        price: 4999,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764489882/david-todd-mccarty-mBtVnivMOCo-unsplash_ufxkug.jpg',
        category: 'Jacket',
        sizes: ['M','L','XL'],
        stock: 20
      },
      {
        name: 'Bomber Jacket',
        description: 'Bomber jacket — casual and trendy.',
        price: 3999,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490076/gytis-bukauskas-dcaSiPNKMTA-unsplash_tl3znt.jpg',
        category: 'Jacket',
        sizes: ['S','M','L'],
        stock: 25
      },
      {
        name: 'Summer Casual Dress',
        description: 'Lightweight summer dress, comfortable for hot weather.',
        price: 1599,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490183/sanskrutihomes-cRpcTf0VfuE-unsplash_ox4pjk.jpg',
        category: 'Dress',
        sizes: ['S','M','L'],
        stock: 45
      },
      {
        name: 'Floral Printed Dress',
        description: 'Floral printed dress — elegant and feminine.',
        price: 1699,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490308/imana-oPbBsP2QygY-unsplash_qcmidm.jpg',
        category: 'Dress',
        sizes: ['M','L'],
        stock: 35
      },
      {
        name: 'Black Formal Shirt',
        description: 'Classic black formal shirt — perfect for office/work.',
        price: 899,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490433/khalid-boutchich-Yqnzd3X-Zv8-unsplash_xzqbyv.jpg',
        category: 'Shirt',
        sizes: ['M','L','XL'],
        stock: 60
      },
      {
        name: 'White Formal Shirt',
        description: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490433/khalid-boutchich-Yqnzd3X-Zv8-unsplash_xzqbyv.jpg.',
        price: 899,
        image: 'https://example.com/images/white-shirt.jpg',
        category: 'Shirt',
        sizes: ['S','M','L'],
        stock: 55
      },
      {
        name: 'Cargo Shorts',
        description: 'Comfortable cargo shorts — great for casual wear.',
        price: 799,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490590/nikola-ABHLcp7juXU-unsplash_jzhmgr.jpg',
        category: 'Shorts',
        sizes: ['M','L','XL'],
        stock: 50
      },
      {
        name: 'Chino Pants',
        description: 'Chino pants — perfect semi-casual wear.',
        price: 1099,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490683/santhosh-vaithiyanathan-ylHcWlrMlzs-unsplash_viymfw.jpg',
        category: 'Pants',
        sizes: ['30','32','34','36'],
        stock: 45
      },
      {
        name: 'Summer Polo Shirt',
        description: 'Breathable polo shirt for summer days.',
        price: 749,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764490841/tian-dayong-ROXPxOD6xsw-unsplash_cynono.jpg',
        category: 'Shirt',
        sizes: ['S','M','L','XL'],
        stock: 65
      },
      {
        name: 'Kids Graphic Tee',
        description: 'Fun graphic tee for kids.',
        price: 499,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764491072/hector-reyes-WNQLkBUV68k-unsplash_s37alj.jpg',
        category: 'T-Shirt',
        sizes: ['XS','S','M'],
        stock: 40
      },
      {
        name: 'Women Denim Jacket',
        description: 'Stylish denim jacket for women.',
        price: 3599,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764491317/latico-leathers-Cyjv57iyiB4-unsplash_vycg5t.jpg',
        category: 'Jacket',
        sizes: ['S','M','L'],
        stock: 30
      },
      {
        name: 'Women Hoodie',
        description: 'Cozy hoodie for women.',
        price: 1199,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764491440/fabian-centeno-Z1LjMlw65vM-unsplash_ryfmwn.jpg',
        category: 'Hoodie',
        sizes: ['S','M','L'],
        stock: 35
      },
      {
        name: 'Jogger Pants',
        description: 'Comfortable jogger pants — casual wear.',
        price: 1299,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764491598/avat-fathiazar-DPesb1g_iEo-unsplash_adt4qo.jpg',
        category: 'Pants',
        sizes: ['M','L','XL'],
        stock: 50
      },
      {
        name: 'Sleeveless Summer Dress',
        description: 'Sleeveless dress for summer.',
        price: 1499,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764491703/elist-nguyen-3ilCOQlibS0-unsplash_ebfclj.jpg',
        category: 'Dress',
        sizes: ['S','M','L'],
        stock: 40
      },
      {
        name: 'Black Sweatshirt',
        description: 'Warm black sweatshirt — casual wear.',
        price: 1399,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764491901/bui-hoang-long-inRQll1nU9k-unsplash_tuasnk.jpg',
        category: 'Sweatshirt',
        sizes: ['M','L','XL'],
        stock: 45
      },
      {
        name: 'Blue Sweatshirt',
        description: 'Comfortable blue sweatshirt.',
        price: 1399,
        image: 'https://res.cloudinary.com/dtrjr55q7/image/upload/v1764492203/rydale-clothing-1Eatm6uznKY-unsplash_gpbce4.jpg',
        category: 'Sweatshirt',
        sizes: ['S','M','L'],
        stock: 45
      }
    ]

    const inserted = await Product.insertMany(products)
    console.log(`Inserted ${inserted.length} products`)

  } catch (err) {
    console.error('Error during seeding:', err)
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed()