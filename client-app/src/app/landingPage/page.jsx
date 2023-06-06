"use client";
import Head from "next/head";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PrimaryFeatures } from "../components/PrimaryFeatures";
import { SecondaryFeatures } from "../components/SecondaryFeatures";
import { CallToAction } from "../components/CallToAction";
import { Testimonials } from "../components/Testimonials";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Flance - where freelancer meets good employer</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Faqs />
      </main>
      <Footer />
    </>
  );
};
export default LandingPage;
