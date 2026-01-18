import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function TripCard({ trip }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group relative h-96 overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm"
    >
      <img
        src={trip.image}
        alt={trip.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
        <div
          className="rounded-t-2xl border-t border-slate-200/70 dark:border-slate-800/70"
          style={{ backgroundColor: "var(--surface-elev)", color: "var(--on-surface)" }}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold" style={{ color: "var(--on-surface)" }}>
              {trip.title}
            </h3>

            <p
              className="mt-1 text-sm line-clamp-3"
              style={{
                color: "color-mix(in srgb, var(--on-surface) 75%, transparent)",
              }}
            >
              {trip.description}
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                {trip.price}
              </span>

              <div className="flex items-center gap-2">
                {/* Book Now */}
                <Link
                  to={`/book/${trip.id}`}
                  className="text-sm inline-flex items-center rounded-full px-3 py-2 hover:opacity-90 transition"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  Book Now
                </Link>

                {/* Brochure */}
                <a
                  href={trip.brochure}
                  download
                  className="text-sm inline-flex items-center rounded-full px-3 py-2 hover:opacity-90 transition"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--on-surface)",
                  }}
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
