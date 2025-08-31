import { useState, useEffect } from 'react';
import { Bluetooth, BluetoothConnected, Printer, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'printing';

interface BluetoothStatusProps {
  onConnect: () => void;
  onDisconnect: () => void;
}

export function BluetoothStatus({ onConnect, onDisconnect }: BluetoothStatusProps) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [deviceName, setDeviceName] = useState<string>('');

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
      case 'printing':
        return 'success';
      case 'connecting':
        return 'warning';
      default:
        return 'muted';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Terhubung';
      case 'connecting':
        return 'Menghubungkan...';
      case 'printing':
        return 'Mencetak...';
      default:
        return 'Tidak Terhubung';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <BluetoothConnected className="h-5 w-5" />;
      case 'connecting':
        return <Bluetooth className="h-5 w-5 animate-pulse" />;
      case 'printing':
        return <Printer className="h-5 w-5 animate-pulse" />;
      default:
        return <Bluetooth className="h-5 w-5" />;
    }
  };

  const handleConnect = () => {
    setStatus('connecting');
    // Simulate connection
    setTimeout(() => {
      setStatus('connected');
      setDeviceName('Thermal Printer TM-88V');
    }, 2000);
    onConnect();
  };

  const handleDisconnect = () => {
    setStatus('disconnected');
    setDeviceName('');
    onDisconnect();
  };

  return (
    <Card className="w-full shadow-receipt">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            {getStatusIcon()}
            <div className="min-w-0">
              <h3 className="font-semibold text-base sm:text-lg truncate">Status Bluetooth</h3>
              {deviceName && (
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{deviceName}</p>
              )}
            </div>
          </div>
          <Badge 
            variant={getStatusColor() === 'success' ? 'default' : 'secondary'}
            className={`
              text-xs shrink-0
              ${getStatusColor() === 'success' ? 'bg-gradient-success text-success-foreground' : ''}
              ${getStatusColor() === 'warning' ? 'bg-warning text-warning-foreground' : ''}
            `}
          >
            {getStatusText()}
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {status === 'disconnected' || status === 'connecting' ? (
            <Button 
              onClick={handleConnect}
              disabled={status === 'connecting'}
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-sm sm:text-base w-full sm:w-auto"
            >
              <Bluetooth className="h-4 w-4 mr-2" />
              {status === 'connecting' ? 'Menghubungkan...' : 'Hubungkan Printer'}
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={handleDisconnect}
              className="text-sm sm:text-base w-full sm:w-auto"
            >
              Putuskan Koneksi
            </Button>
          )}
        </div>

        {status === 'connected' && (
          <div className="mt-3 sm:mt-4 p-3 bg-success-muted rounded-lg">
            <div className="flex items-center text-success">
              <Wifi className="h-4 w-4 mr-2 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Siap menerima data cetak</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}