
import { useState, useEffect } from 'react';
import { Cloud, Wifi, Database, Server, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SystemStatus = () => {
  const [statuses, setStatuses] = useState({
    sync: 'Operational',
    storage: 'Operational',
    database: 'Operational',
    server: 'Operational'
  });

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      document.getElementById('last-update')?.setAttribute('data-time', timestamp);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-t-4 border-t-[#a9def9]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Cloud className="h-5 w-5 text-[#9b87f5]" />
              Cloud System Status
            </CardTitle>
            <CardDescription>
              Real-time monitoring of cloud services
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-[#4ade80]/10 text-[#4ade80] hover:bg-[#4ade80]/20">
            All Systems Operational
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="h-4 w-4 text-[#9b87f5]" />
              <Badge variant="secondary" className="bg-[#4ade80]/10 text-[#4ade80]">
                {statuses.sync}
              </Badge>
            </div>
            <p className="text-sm font-medium">Real-time Sync</p>
          </div>
          
          <div className="p-4 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Cloud className="h-4 w-4 text-[#9b87f5]" />
              <Badge variant="secondary" className="bg-[#4ade80]/10 text-[#4ade80]">
                {statuses.storage}
              </Badge>
            </div>
            <p className="text-sm font-medium">Cloud Storage</p>
          </div>
          
          <div className="p-4 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-4 w-4 text-[#9b87f5]" />
              <Badge variant="secondary" className="bg-[#4ade80]/10 text-[#4ade80]">
                {statuses.database}
              </Badge>
            </div>
            <p className="text-sm font-medium">Database</p>
          </div>
          
          <div className="p-4 bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Server className="h-4 w-4 text-[#9b87f5]" />
              <Badge variant="secondary" className="bg-[#4ade80]/10 text-[#4ade80]">
                {statuses.server}
              </Badge>
            </div>
            <p className="text-sm font-medium">Server Status</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[#4ade80]" />
            <span>All services are operating normally</span>
          </div>
          <span id="last-update" data-time={new Date().toLocaleTimeString()}>
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
