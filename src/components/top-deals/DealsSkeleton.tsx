import { motion } from "framer-motion";

export default function DealsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="rounded-2xl bg-white p-4 shadow-sm"
        >
          <div className="h-44 w-full rounded-xl bg-slate-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
          <div className="mt-4 h-8 w-full rounded-xl bg-slate-200" />
        </motion.div>
      ))}
    </div>
  );
}
