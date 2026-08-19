"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { GradientBlobs } from "./gradient-blobs";
import { BadgePill } from "./badge-pill";
import { AvatarStack } from "./avatar-stack";
import { HeroShowcase } from "./hero-showcase";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/components/shared/motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b pb-32">
      <GradientBlobs />

      {/* Main Hero Container */}
      <div className="site-container">
        <motion.div
          className="
            mx-auto
            flex
            max-w-4xl
            flex-col
            items-center
            px-0
            pt-28
            text-center
            md:pt-36
          "
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <BadgePill>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Now building with AI-powered workflows
            </BadgePill>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUpVariants}
            className="
              mt-6
              text-balance
              text-4xl
              font-bold
              leading-[1.05]
              tracking-tight
              sm:text-5xl
              md:text-7xl
            "
          >
            Websites &amp; automation,{" "}
            <span className="text-gradient">
              built with AI speed.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="
              mt-6
              max-w-xl
              text-balance
              text-base
              text-muted-foreground
              sm:text-lg
            "
          >
            We design, build, and automate digital products for
            modern businesses — from first pixel to production,
            powered by AI at every step.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="
              mt-10
              flex
              flex-col
              items-center
              gap-4
              sm:flex-row
            "
          >
            <Button
              asChild
              size="lg"
              className="
                group
                h-12
                px-8
                text-base
                shadow-lg
                shadow-primary/20
              "
            >
              <Link href="/contact">
                Start your project
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <Link href="/portfolio">
                See our work
              </Link>
            </Button>
          </motion.div>

          {/* Trusted */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-14"
          >
            <AvatarStack label="Trusted by 40+ growing businesses" />
          </motion.div>
        </motion.div>

        {/* Hero Showcase */}
        <HeroShowcase />
      </div>
    </section>
  );
}