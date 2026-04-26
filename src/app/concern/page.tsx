import type { Metadata } from "next";
import RealConcernPage from "@/features/concern/RealConcernPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/concern",
  },
};

export default function ConcernPage() {
  return <RealConcernPage />;
}
