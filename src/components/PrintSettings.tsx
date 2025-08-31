import { Settings, Printer, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function PrintSettings() {
  return (
    <Card className="w-full shadow-receipt">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Pengaturan Cetak</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Paper Size */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Ukuran Kertas</span>
          </Label>
          <Select defaultValue="58mm">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="58mm">58mm (Thermal)</SelectItem>
              <SelectItem value="80mm">80mm (Thermal)</SelectItem>
              <SelectItem value="a4">A4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Print Quality */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2">
            <Printer className="h-4 w-4" />
            <span>Kualitas Cetak</span>
          </Label>
          <Select defaultValue="normal">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft (Cepat)</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">Tinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-cut">Potong Otomatis</Label>
            <Switch id="auto-cut" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="print-header">Cetak Header</Label>
            <Switch id="print-header" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="print-footer">Cetak Footer</Label>
            <Switch id="print-footer" defaultChecked />
          </div>
        </div>

        <Separator />

        {/* Connection Info */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="font-medium">Info Koneksi:</p>
          <p>• Pastikan printer dalam mode pairing</p>
          <p>• Jarak maksimal 10 meter</p>
          <p>• Mendukung ESC/POS commands</p>
        </div>
      </CardContent>
    </Card>
  );
}