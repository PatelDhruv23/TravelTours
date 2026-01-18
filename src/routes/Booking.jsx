import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import trips from "../trips/data.js"
import { supabase } from "../lib/supabaseClient.js"

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()

  const trip = useMemo(() => trips.find((t) => t.id === id), [id])

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    persons: 1,
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSuccessMsg("")
    setErrorMsg("")

    if (!form.fullName || !form.email || !form.phone || !form.travelDate) {
      setErrorMsg("Please fill all required fields.")
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          tour_id: trip.id,
          tour_title: trip.title,
          travel_date: form.travelDate,
          persons: Number(form.persons),
          message: form.message || null,
          status: "PENDING",
        },
      ])

      if (error) throw error

      setSuccessMsg("✅ Booking successful! We will contact you soon.")
      setForm({
        fullName: "",
        email: "",
        phone: "",
        travelDate: "",
        persons: 1,
        message: "",
      })
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h2
            className="text-2xl font-semibold"
            style={{ color: "var(--on-surface)" }}
          >
            Trip not found ❌
          </h2>
          <p
            className="mt-2"
            style={{
              color: "color-mix(in srgb, var(--on-surface) 70%, transparent)",
            }}
          >
            The trip you are trying to book does not exist.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center rounded-full border-2 border-white text-white px-6 py-3 font-medium shadow-sm 
                       bg-transparent transition duration-300 ease-in-out 
                       hover:bg-[var(--color-primary)] hover:text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero section same as Home */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-secondary]/40 via-[--color-accent]/30 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight"
            style={{ color: "var(--on-surface)" }}
          >
            Book your trip to {trip.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-4 max-w-2xl"
            style={{
              color: "color-mix(in srgb, var(--on-surface) 70%, transparent)",
            }}
          >
            Fill in your details and confirm your booking. We’ll reach out shortly
            with next steps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-8 flex gap-3 flex-wrap"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center rounded-full border-2 border-white text-white px-6 py-3 font-medium shadow-sm 
                         bg-transparent transition duration-300 ease-in-out 
                         hover:bg-[var(--color-primary)] hover:text-white"
            >
              Back
            </button>

            <a
              href="#booking-form"
              className="inline-flex items-center rounded-full border-2 border-white text-white px-6 py-3 font-medium shadow-sm 
                         bg-transparent transition duration-300 ease-in-out 
                         hover:bg-[var(--color-primary)] hover:text-white"
            >
              Continue booking
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking content */}
      <section
        id="booking-form"
        className="max-w-6xl mx-auto px-4 py-12 sm:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trip Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-sm"
          >
            <div className="p-5 sm:p-6">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>

              <div className="mt-5">
                <h2
                  className="text-2xl font-semibold"
                  style={{ color: "var(--on-surface)" }}
                >
                  {trip.title}
                </h2>

                <p
                  className="mt-2"
                  style={{
                    color:
                      "color-mix(in srgb, var(--on-surface) 70%, transparent)",
                  }}
                >
                  {trip.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p
                    className="text-sm sm:text-base font-medium"
                    style={{ color: "var(--on-surface)" }}
                  >
                    Price:{" "}
                    <span className="text-[--color-primary] font-semibold">
                      {trip.price}
                    </span>
                  </p>

                  {trip.brochure && (
                    <a
                      href={trip.brochure}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[--color-primary] hover:underline text-sm"
                    >
                      View brochure
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm"
          >
            <div className="p-5 sm:p-6">
              <h3
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: "var(--on-surface)" }}
              >
                Booking details
              </h3>

              <p
                className="mt-2 text-sm"
                style={{
                  color: "color-mix(in srgb, var(--on-surface) 70%, transparent)",
                }}
              >
                Fields marked with * are required.
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                {/* Full Name */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--on-surface)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                    style={{ color: "var(--on-surface)" }}
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={onChange}
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--on-surface)" }}
                  >
                    Email *
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                    style={{ color: "var(--on-surface)" }}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={onChange}
                  />
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--on-surface)" }}
                  >
                    Phone *
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                    style={{ color: "var(--on-surface)" }}
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={onChange}
                  />
                </div>

                {/* Travel Date + Persons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium"
                      style={{ color: "var(--on-surface)" }}
                    >
                      Travel Date *
                    </label>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                      style={{ color: "var(--on-surface)" }}
                      type="date"
                      name="travelDate"
                      value={form.travelDate}
                      onChange={onChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium"
                      style={{ color: "var(--on-surface)" }}
                    >
                      Persons *
                    </label>
                    <input
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                      style={{ color: "var(--on-surface)" }}
                      type="number"
                      min="1"
                      name="persons"
                      value={form.persons}
                      onChange={onChange}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--on-surface)" }}
                  >
                    Message (optional)
                  </label>
                  <textarea
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none resize-none"
                    style={{ color: "var(--on-surface)" }}
                    name="message"
                    rows={4}
                    placeholder="Any special requests?"
                    value={form.message}
                    onChange={onChange}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center rounded-full border-2 border-white text-white px-6 py-3 font-medium shadow-sm 
                             bg-transparent transition duration-300 ease-in-out 
                             hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-60"
                >
                  {loading ? "Booking..." : "Confirm booking"}
                </button>

                {/* Messages */}
                {successMsg && (
                  <p className="text-sm mt-2 text-green-400">{successMsg}</p>
                )}
                {errorMsg && (
                  <p className="text-sm mt-2 text-red-400">{errorMsg}</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
