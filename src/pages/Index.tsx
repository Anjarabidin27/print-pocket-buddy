import { useState } from 'react';
import { Printer, Smartphone, Bluetooth } from 'lucide-react';
import { BluetoothStatus } from '@/components/BluetoothStatus';
import { PrintQueue } from '@/components/PrintQueue';
import { PrintSettings } from '@/components/PrintSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card className="bg-gradient-primary text-primary-foreground shadow-printer-glow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Printer className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Print Pocket Buddy</h1>
                <p className="text-primary-foreground/90">Aplikasi Cetak Bluetooth Ringan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Bluetooth Status */}
        <BluetoothStatus 
          onConnect={() => setIsConnected(true)}
          onDisconnect={() => setIsConnected(false)}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Print Queue */}
          <PrintQueue isConnected={isConnected} />
          
          {/* Print Settings */}
          <PrintSettings />
        </div>

        {/* Quick Actions */}
        <Card className="shadow-receipt">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Aksi Cepat
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-12 justify-start"
                disabled={!isConnected}
              >
                <Bluetooth className="h-4 w-4 mr-2" />
                Test Koneksi
              </Button>
              <Button 
                variant="outline" 
                className="h-12 justify-start"
                disabled={!isConnected}
              >
                <Printer className="h-4 w-4 mr-2" />
                Test Print
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>Print Pocket Buddy v1.0 • Ringan untuk Android Oreo 8.1+</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
