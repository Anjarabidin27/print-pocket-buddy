import { useState } from 'react';
import { FileText, Clock, CheckCircle, XCircle, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrintJob {
  id: string;
  title: string;
  timestamp: Date;
  status: 'pending' | 'printing' | 'completed' | 'failed';
  pages: number;
}

interface PrintQueueProps {
  isConnected: boolean;
}

export function PrintQueue({ isConnected }: PrintQueueProps) {
  const [printJobs, setPrintJobs] = useState<PrintJob[]>([
    {
      id: '1',
      title: 'Struk Penjualan #001',
      timestamp: new Date(Date.now() - 300000),
      status: 'completed',
      pages: 1
    },
    {
      id: '2', 
      title: 'Struk Penjualan #002',
      timestamp: new Date(Date.now() - 120000),
      status: 'pending',
      pages: 1
    }
  ]);

  const getStatusIcon = (status: PrintJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'printing':
        return <Printer className="h-4 w-4 text-warning animate-pulse" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: PrintJob['status']) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'printing':
        return 'Mencetak';
      case 'failed':
        return 'Gagal';
      default:
        return 'Menunggu';
    }
  };

  const printJob = (jobId: string) => {
    if (!isConnected) return;
    
    setPrintJobs(jobs => 
      jobs.map(job => 
        job.id === jobId 
          ? { ...job, status: 'printing' as const }
          : job
      )
    );

    // Simulate printing
    setTimeout(() => {
      setPrintJobs(jobs => 
        jobs.map(job => 
          job.id === jobId 
            ? { ...job, status: 'completed' as const }
            : job
        )
      );
    }, 3000);
  };

  const addTestJob = () => {
    const newJob: PrintJob = {
      id: Date.now().toString(),
      title: `Struk Penjualan #${String(printJobs.length + 1).padStart(3, '0')}`,
      timestamp: new Date(),
      status: 'pending',
      pages: 1
    };
    setPrintJobs(jobs => [newJob, ...jobs]);
  };

  return (
    <Card className="w-full shadow-receipt">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          <span>Antrian Cetak</span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={addTestJob}
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            + Test
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-48 sm:h-64">
          {printJobs.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-muted-foreground">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 opacity-50" />
              <p className="text-sm">Tidak ada antrian cetak</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {printJobs.map((job) => (
                <div 
                  key={job.id}
                  className="flex items-center justify-between p-3 bg-gradient-receipt rounded-lg border"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{job.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {job.timestamp.toLocaleTimeString('id-ID')} • {job.pages} hal
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 shrink-0">
                    <Badge variant="secondary" className="flex items-center space-x-1 text-xs">
                      {getStatusIcon(job.status)}
                      <span className="hidden sm:inline">{getStatusText(job.status)}</span>
                    </Badge>
                    
                    {job.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => printJob(job.id)}
                        disabled={!isConnected}
                        className="bg-gradient-primary hover:opacity-90 transition-opacity text-xs px-2 sm:px-3"
                      >
                        <Printer className="h-3 w-3 sm:mr-1" />
                        <span className="hidden sm:inline">Cetak</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}