
import MainLayout from "@/components/layout/MainLayout";

const PrivacyPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="prose dark:prose-invert">
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Event preferences and history</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your transactions</li>
            <li>Send you important information</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          {/* Add more privacy policy content as needed */}
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;
