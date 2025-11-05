// src/pages/AboutUs.jsx
import React, { useState, useEffect } from "react";

import Amenities from "../components/About Us/Amenities";
import Services from "../components/About Us/Services";
import CTA from "../components/About Us/CTASection";
import HeroSection from "../components/About Us/HeroSection";
import ContentSection from "../components/About Us/ContentSection";
import { cachedFetchAboutPage } from "../utils/apiCache";

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cachedFetchAboutPage();
        setData(result);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="font-display bg-background-light dark:bg-background-dark text-[#0d131c] dark:text-gray-200">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="flex flex-1 justify-center">
              <div className="layout-content-container flex flex-col max-w-7xl flex-1">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="font-display bg-background-light dark:bg-background-dark text-[#0d131c] dark:text-gray-200">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="flex flex-1 justify-center">
              <div className="layout-content-container flex flex-col max-w-7xl flex-1">
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-600 dark:text-gray-400">Failed to load data.</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#0d131c] dark:text-gray-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-7xl flex-1">
              {/* Note: Navbar & Footer intentionally excluded */}
              <HeroSection
                title={data.aboutUsSection.title}
                description={data.aboutUsSection.description}
                backgroundImage={data.aboutUsSection.headerImage.url}
              />
              <ContentSection contentBlocks={data.contentBlocks} />

              <Amenities amenities={data.amenities} />

              <Services services={data.services} />

              <CTA />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
