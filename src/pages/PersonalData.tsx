import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/personal-data/PageHeader";
import DocumentHeader from "@/components/personal-data/DocumentHeader";
import CompanyInfo from "@/components/personal-data/CompanyInfo";
import SubjectCategories from "@/components/personal-data/SubjectCategories";
import DataCategories from "@/components/personal-data/DataCategories";
import ProcessingPurposes from "@/components/personal-data/ProcessingPurposes";
import LegalBasis from "@/components/personal-data/LegalBasis";
import ProcessingMethods from "@/components/personal-data/ProcessingMethods";
import ProcessingTerms from "@/components/personal-data/ProcessingTerms";
import SubjectRights from "@/components/personal-data/SubjectRights";
import SecurityMeasures from "@/components/personal-data/SecurityMeasures";
import ContactInfo from "@/components/personal-data/ContactInfo";
import ConclusionSection from "@/components/personal-data/ConclusionSection";

export default function PersonalData() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <Card className="max-w-4xl mx-auto">
          <DocumentHeader />

          <CardContent className="prose max-w-none">
            <div className="space-y-8">
              <CompanyInfo />
              <SubjectCategories />
              <DataCategories />
              <ProcessingPurposes />
              <LegalBasis />
              <ProcessingMethods />
              <ProcessingTerms />
              <SubjectRights />
              <SecurityMeasures />
              <ContactInfo />
              <ConclusionSection />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
