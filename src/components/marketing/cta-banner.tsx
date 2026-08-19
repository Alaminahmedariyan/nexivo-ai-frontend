"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBlobs } from "./gradient-blobs";
import { FadeIn } from "@/components/shared/motion";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-t">
      <GradientBlobs />
      <FadeIn className="mx-auto max-w-3xl px-4 py-28 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Less time <span className="text-gradient">planning.</span>
          <br />
          More time <span className="text-gradient">shipping.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          Tell us about your project — get a response within 1 business day.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
          <Button asChild size="lg" className="group h-12 px-8 text-base shadow-lg shadow-primary/20">
            <Link href="/contact">
              Start your project
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </FadeIn>
    </section>
  );
}