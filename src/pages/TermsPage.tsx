
import MainLayout from "@/components/layout/MainLayout";

const TermsPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Terms & Conditions</h1>
        <div className="prose dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the
            terms and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials
            (information or software) on Eventory's website for personal,
            non-commercial transitory viewing only.
          </p>

          {/* Add more terms content as needed */}
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;
