
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CountdownProps {
  targetDate: string;
  eventTitle: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventCountdown = ({ targetDate, eventTitle }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className={`${isExpired ? "bg-muted/50" : "bg-primary/5"}`}>
      <CardContent className="pt-6">
        <h4 className="text-sm font-medium mb-2 line-clamp-1">{eventTitle}</h4>
        
        {isExpired ? (
          <div className="text-muted-foreground text-sm">
            This event has already taken place
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs text-muted-foreground">Mins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs text-muted-foreground">Secs</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCountdown;
