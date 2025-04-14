"use client";
import { motion } from "framer-motion";

export default function ToLoud() {
  return (
    <div>
      <div className="w-full">
        <motion.p
        style={{ willChange: "transform, opacity" }}
          initial={{ y: 100 }}
          whileInView={{ y: 0, opacity:1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[150px] md:text-[200px] lg:text-[300px] xl:text-[480px]
            min-h-[100px] md:min-h-[200px] lg:min-h-[300px] xl:min-h-[500px]
            text-black  tracking-wide text-center -mb-[80px]
            md:mb-[-100px] lg:mb-[-150px] xl:mb-[-250px] font-outward"
        >
          TOO LOUD TO BE
        </motion.p>
      </div>
    </div>
  );
}