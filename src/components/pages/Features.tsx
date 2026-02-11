// src/components/features/index.ts

import React from "react";
import FeaturesLayout from "../features/FeaturesLayout";

const Features: React.FC = () => {
  return <FeaturesLayout />;
};

export { default as FeaturesLayout } from "../features/FeaturesLayout";
export { default as FeaturesHero } from "../features/FeaturesHero";
export { default as FeatureCategory } from "../features/FeatureCategory";
export { default as FeatureDetail } from "../features/FeatureDetail";
export { default as FeaturesStats } from "../features/FeaturesStats";
export { default as ResearchMethodology } from "../features/ResearchMethodology";
export { default as MLDemo } from "../features/MLDemo";

export default Features;
