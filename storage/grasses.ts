import { IGrass } from '../interfaces/grass'
import alfalfa from '../public/grasses/alfalfa.jpg.webp'
import bermuda from '../public/grasses/bermuda.jpg.webp'
import bluegrass from '../public/grasses/bluegrass.jpg.webp'
import bromegrass from '../public/grasses/bromegrass.jpg.webp'
import clover from '../public/grasses/clover.jpg.webp'
import fescue from '../public/grasses/fescue.jpg.webp'
import oat from '../public/grasses/oat.jpg.webp'
import orchardgrass from '../public/grasses/orchardgrass.jpg.webp'
import ryegrass from '../public/grasses/ryegrass.webp'
import timothy from '../public/grasses/timothy.png.webp'

// coastal
import coastalImage1 from '../public/products/coastal/originals/coastal-image-1.png'
import coastalImage2 from '../public/products/coastal/originals/coastal-image-2.jpg'
import coastalImage3 from '../public/products/coastal/originals/coastal-image-3.jpg'
import coastalImage4 from '../public/products/coastal/originals/coastal-image-4.jpg'

import coastalThumbnail1 from '../public/products/coastal/thumbnails/coastal-thumbnail-1.png'
import coastalThumbnail2 from '../public/products/coastal/thumbnails/coastal-thumbnail-2.jpg'
import coastalThumbnail3 from '../public/products/coastal/thumbnails/coastal-thumbnail-3.jpg'
import coastalThumbnail4 from '../public/products/coastal/thumbnails/coastal-thumbnail-4.jpg'
// coastal

const Grasses: IGrass[] = [
  {
    title: 'Coastal',
    image: coastalImage1,
    price: 70,
    description: [''],
    priceRange: { lower: 7, upper: 110 },
    prices: {
      'Small Square Bales': 7,
      'Large Square Bales': 85,
      'Round Bales': 110,
    },
    images: [
      {
        original: coastalImage1.src,
        thumbnail: coastalThumbnail1.src,
      },
      {
        original: coastalImage2.src,
        thumbnail: coastalThumbnail2.src,
      },
      {
        original: coastalImage3.src,
        thumbnail: coastalThumbnail3.src,
      },
      {
        original: coastalImage4.src,
        thumbnail: coastalThumbnail4.src,
      },
    ]
  },

  {
    image: alfalfa,
    title: 'alfalfa',
    description: [
      'Alfalfa is the most common type of legume hay for horses, as it is high in fiber, protein, and calcium. It typically has a thicker stem and contains lots of leaves.',
      'Alfalfa hay is generally only fed to horses that need higher energy and nutrition, such as top-performing show horses. It can also be a good option for underweight horses and horses with muscle problems as well.',
      'Though alfalfa can be a great option for top-performing horses, it is generally recommended to avoid feeding it when horses are working hard in hot weather. This is because protein metabolism creates more heat than it does fat or carbohydrate metabolism.',
      'However, the added heat can hinder a horse’s ability to dissipate heat, potentially causing overheating and dehydration.'
    ],
    price: 95
  },
  {
    image: bermuda,
    title: 'Bermuda',
    description: [
      'Bermuda grass, also known as coastal hay, grows in a variety of conditions, making it a common option for horses. It is generally the cheapest hay to purchase, which makes it a practical choice.',
      'Though lower in protein than other grass hays, Bermuda is still a good source of nutrition for most horses. However, low-quality Bermuda has been linked with impaction colic, so it is important to examine the quality at purchase.'
    ],
    price: 50
  },
  {
    image: bluegrass,
    title: 'Bluegrass',
    description: [
      'Hailing from Kentucky, Bluegrass is highly nutritional and palatable. Since it is low-yielding, it tends to be a more popular option for grazing than for cutting as hay.',
      'Bluegrass is very tolerant of winters, but does not do as well in the summer heat. It is capable of growing a wide variety of climates and makes good forage for most horses.'
    ],
    price: 90
  },
  {
    image: bromegrass,
    title: 'Bromegrass',
    description: [
      'Bromegrass tends to be a smoother option, as it provides more leaves and fewer stems. It offers similar nutrition to timothy, making it a great option for horse owners.',
      'Bromegrass is a great overall choice for not only young and active horses, but also lightly-worked and older horses. This palatable option also provides additional fiber for a balanced diet.'
    ],
    price: 90
  },
  {
    image: clover,
    title: 'Clover',
    description: [
      'Clover hay is another type of legume hay fed to horses, though it is not as popular as alfalfa. Due to its high moisture content, it can be more difficult to dry and bale.',
      'Clover hay comes in varieties including red, white, crimson, alsike, and landino, though It is commonly mixed with grass hay. It is high in protein, calcium, fiber, and other nutrients, making it a good choice for working horses.',
      'Clover hay is more prone to molding and is also known to cause excessive slobber in some horses.'
    ],
    price: 90
  },
  {
    image: fescue,
    title: 'Fescue',
    description: [
      'Fescue is low-maintenance and is able to grow in most conditions. It grows on approximately 35 million acres of land in America, making it one of the top producing hays in the country.',
      'Fescue grows tall and broad, is low in sugar, and is palatable, making it a practical option for most horses. However, pregnant mares should not be given fescue hay as it can carry an endophyte fungal infection which can be harmful to makes and foals.',
      'If you feed your horse fescue hay, you should have it tested for fungal infection prior to purchase.'
    ],
    price: 90
  },
  {
    image: oat,
    title: 'Oat',
    description: [
      'Oat hay has thicker, tougher stalks and is cut between the milk and soft dough stages of the oat cycle. It is overall palatable to horses, but some horses don’t like the thicker stalks.',
      'Oat hay is high in protein and other nutrients, making it a good option for a lot of horses. However, it tends to be high in sugar, which means that it is not a good choice for insulin-resistant horses.'
    ],
    price: 90
  },
  {
    image: orchardgrass,
    title: 'Orchardgrass',
    description: [
      'Orchardgrass is fast growing while also being full of digestible fiber content. It tends to be higher in protein than timothy, with a good balance of calcium and phosphorus.',
      'Orchardgrass is a good option for senior horses or horses with digestive issues. It is a palatable option that has a thick blade but a soft texture. Orchardgrass fields can be harvested as hay at least three times a year.'
    ],
    price: 90
  },
  {
    image: ryegrass,
    title: 'Ryegrass',
    description: [
      'Ryegrass is growing in popularity among horse owners as it is quick to establish and grow. In addition, it offers good nutrition, making it an overall good choice for most horses.',
      'Though it does tend to grow well, ryegrass is sensitive to moisture fluctuations. It has a fine texture that is palatable to horses.'
    ],
    price: 90
  },
  {
    image: timothy,
    title: 'Timothy',
    description: [
      'Timothy is a very popular choice among horse owners, as a good option for horses of various work levels. It is palatable as well as being easier on the digestive system than other hays.',
      'Timothy is high in fiber and nutrients, but lower in calcium and protein than alfalfa. It tends to be finer in texture than other grass hays, which some horses prefer.',
      'Giving horses Timothy hay is a great way to satisfy their appetite without adding excess calories.'
    ],
    price: 90
  },
]

export { Grasses };