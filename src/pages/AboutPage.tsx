
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">About Eventory</h1>
        
        <Card className="mb-8 card-gradient">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At Eventory, we believe in the power of meaningful connections and shared experiences. 
              Our mission is to bring people together through carefully curated events that inspire, 
              educate, and entertain. We strive to create a platform where event organizers and 
              attendees can seamlessly connect, making the process of discovering and participating 
              in events effortless and enjoyable.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8 card-gradient">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-muted-foreground mb-4">
              Eventory is a comprehensive event management platform designed to simplify the entire 
              event lifecycle. From tech conferences and workshops to cultural festivals and networking 
              meetups, we host a diverse range of events across India's major cities.
            </p>
            <p className="text-muted-foreground mb-4">
              Our platform offers tools for event discovery, seamless registration, secure payment 
              processing, and attendee management. We work closely with event organizers to ensure 
              high-quality experiences while providing attendees with personalized recommendations 
              and exceptional customer service.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Quality & Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain high standards for all events on our platform, ensuring exceptional 
                  experiences for all participants.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Inclusivity & Diversity</h3>
                <p className="text-muted-foreground">
                  We believe in creating spaces where everyone feels welcome, valued, and represented.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve our platform to meet the changing needs of event organizers and attendees.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Community Focus</h3>
                <p className="text-muted-foreground">
                  We foster meaningful connections and support the development of vibrant communities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
