import { motion, type Variants} from 'framer-motion'
import './PartsShowcase.css'

const partImages = [
  {
    id: 'brakes',
    src: '/images/hero/brake-pads.jpg',
    alt: 'Premium brake pads',
  },
  {
    id: 'disc',
    src: '/images/hero/brake-disc.jpg',
    alt: 'Vented brake disc',
  },
  {
    id: 'oil',
    src: '/images/hero/engine-oil.jpg',
    alt: 'Synthetic engine oil',
  },
  {
    id: 'filter',
    src: '/images/hero/oil-filter.jpg',
    alt: 'High-flow oil filter',
  },
]

const textItem: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.5,
      // можно указать кастомный easing как массив, если хочется:
      // ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function PartsShowcase() {
  return (
    <motion.section
      className="ps-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="ps-inner">
        {/* Блок с картинками */}
        <motion.div
          className="ps-images"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Карточка 1 */}
          <motion.div
            className="ps-image-card ps-image-card--1 ps-image-card--round"
            whileInView={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={partImages[0].src} alt={partImages[0].alt} />
          </motion.div>

          {/* Карточка 2 */}
          <motion.div
            className="ps-image-card ps-image-card--2"
            whileInView={{ y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={partImages[1].src} alt={partImages[1].alt} />
          </motion.div>

          {/* Карточка 3 */}
          <motion.div
            className="ps-image-card ps-image-card--3 ps-image-card--round"
            whileInView={{ y: [0, -14, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={partImages[2].src} alt={partImages[2].alt} />
          </motion.div>

          {/* Карточка 4 */}
          <motion.div
            className="ps-image-card ps-image-card--4"
            whileInView={{ y: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={partImages[3].src} alt={partImages[3].alt} />
          </motion.div>
        </motion.div>

        {/* Текстовый блок */}
        <motion.div
          className="ps-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p className="ps-kicker" variants={textItem} custom={0}>
            Online auto parts catalogue
          </motion.p>

          <motion.h2 className="ps-title" variants={textItem} custom={1}>
            Genuine-grade parts with clear fitment information.
          </motion.h2>

          <motion.p className="ps-body" variants={textItem} custom={2}>
            Our inventory is built for real owners and mechanics: clear brands,
            verified categories, transparent pricing, and stock you can trust.
          </motion.p>

          <motion.ul className="ps-list" variants={textItem} custom={3}>
            <li>• Quick search by brand, category, or SKU</li>
            <li>• Clean filtering for brakes, filters, oil, suspension</li>
            <li>• Data served from a real backend API (NestJS + Prisma)</li>
            <li>• Ready for scaling into a full storefront later</li>
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  )
}