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
    <div className="min-h-screen bg-background p-3 sm:p-4">
      {/* Header - Mobile optimized */}
      <div className="max-w-4xl mx-auto mb-4 sm:mb-6">
        <Card className="bg-gradient-primary text-primary-foreground shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-full flex-shrink-0">
                <Printer className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold truncate">Print Pocket Buddy</h1>
                <p className="text-sm sm:text-base text-primary-foreground/90">Cetak Bluetooth untuk POS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Mobile responsive */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Bluetooth Status */}
        <BluetoothStatus 
          onConnect={() => setIsConnected(true)}
          onDisconnect={() => setIsConnected(false)}
        />

        {/* Mobile-first Layout */}
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {/* Print Queue */}
          <PrintQueue isConnected={isConnected} />
          
          {/* Print Settings */}
          <PrintSettings />
        </div>

        {/* Quick Actions - Mobile optimized */}
        <Card className="shadow-receipt">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
              <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Aksi Cepat
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-11 sm:h-12 justify-start text-sm sm:text-base"
                disabled={!isConnected}
              >
                <Bluetooth className="h-4 w-4 mr-2" />
                Test Koneksi
              </Button>
              <Button 
                variant="outline" 
                className="h-11 sm:h-12 justify-start text-sm sm:text-base"
                disabled={!isConnected}
              >
                <Printer className="h-4 w-4 mr-2" />
                Test Print
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-xs sm:text-sm text-muted-foreground py-4">
          <p>Print Pocket Buddy v1.0 • Optimized untuk Android 8.1+</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
