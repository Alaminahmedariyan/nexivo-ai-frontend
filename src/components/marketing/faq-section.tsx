import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/shared/motion";

const FAQS = [
  { question: "What kind of projects do you take on?", answer: "From marketing websites and landing pages to full-scale SaaS platforms and AI-powered automation — if it involves the web, we can build it." },
  { question: "How is AI actually used in your process?", answer: "AI speeds up everything from initial proposals to code scaffolding and QA — meaning faster turnaround without sacrificing quality or a human touch on every decision." },
  { question: "How long does a typical project take?", answer: "Most projects launch in 2–6 weeks depending on scope. You'll get a clear milestone timeline before we start, and full visibility into progress the whole way through." },
  { question: "Do I get to track progress along the way?", answer: "Yes — every client gets access to a dedicated portal showing live project status, milestones, files, and invoices. No more chasing updates over email." },
  { question: "What happens after launch?", answer: "We offer ongoing support and maintenance packages, plus the option to keep iterating with us as your product grows." },
];

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <FadeIn className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Questions clients ask us</h2>
      </FadeIn>

      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}