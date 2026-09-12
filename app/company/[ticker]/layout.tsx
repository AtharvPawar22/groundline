import { notFound } from "next/navigation";
import { getCompany, getAllCompanies } from "../../../lib/data";
import CompanyHeader from "../../../components/layout/CompanyHeader";
import TabBar from "../../../components/layout/TabBar";
import VitalsStrip from "../../../components/layout/VitalsStrip";

export function generateStaticParams() {
  return getAllCompanies().map((c) => ({
    ticker: c.ticker,
  }));
}

export default function CompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);

  if (!company) {
    notFound();
  }

  return (
    <div>
      <CompanyHeader company={company} />
      <VitalsStrip company={company} />
      <TabBar company={company} />
      <div>{children}</div>
    </div>
  );
}
