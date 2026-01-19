import { motion } from 'framer-motion'
import TripCard from '../ui/TripCard.jsx'
import CardCarousel from '../ui/CardCarousel.jsx'
import CardSwiper from '../ui/CardSwiper.jsx'
import trips from '../trips/data.js'

export default function HomePage() {
  const featured = trips.slice(0, 6)
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-secondary]/40 via-[--color-accent]/30 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-6xl font-semibold tracking-tight" style={{ color: 'var(--on-surface)' }}>
            Explore the world and make memories
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-4 max-w-2xl" style={{ color: 'color-mix(in srgb, var(--on-surface) 70%, transparent)' }}>
            Curated journeys with elegant stays, scenic routes, and gentle adventures.
          </motion.p>
         <motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.25, duration: 0.5 }}
  className="mt-8"
>
  <a
    href="#featured"
    className="inline-flex items-center rounded-full border-2 border-white text-white  px-6 py-3 font-medium shadow-sm 
               bg-transparent transition duration-300 ease-in-out 
               hover:bg-[var(--color-primary)] hover:text-white"
  >
    Discover trips
  </a>
</motion.div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
           <div className="w-full max-w-4xl"> 
              <CardCarousel
                items={featured.map((t) => ({
                src: t.carouselImage, 
                alt: t.title,
              }))}
  intervalMs={4000}
/>
           </div>
        </div>
      </section>


      <section id="featured" className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--on-surface)' }}>Featured trips</h2>
          <a href="/trips" className="text-[--color-primary] hover:underline">View all</a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </section>
    </div>
  )
}


