export interface QRCodeData {
  gymId: number;
  gymName: string;
  timestamp: number;
  checksum: string;
}

class QRCodeService {
  /**
   * Parse QR code data from scanned string
   */
  parseQRCode(qrString: string): QRCodeData | null {
    try {
      // Expected format: "unipass://checkin?gym=1&name=Smart%20Fit&timestamp=1234567890&checksum=abcd1234"
      const url = new URL(qrString);
      
      if (url.protocol !== 'unipass:' || url.pathname !== '//checkin') {
        throw new Error('Invalid QR code format');
      }

      const params = url.searchParams;
      const gymId = parseInt(params.get('gym') || '0');
      const gymName = decodeURIComponent(params.get('name') || '');
      const timestamp = parseInt(params.get('timestamp') || '0');
      const checksum = params.get('checksum') || '';

      if (!gymId || !gymName || !timestamp || !checksum) {
        throw new Error('Missing required parameters');
      }

      // Validate timestamp (QR code should be recent - within 24 hours)
      const now = Date.now();
      const ageInHours = (now - timestamp) / (1000 * 60 * 60);
      
      if (ageInHours > 24) {
        throw new Error('QR code expired');
      }

      // Validate checksum (simple validation for demo)
      const expectedChecksum = this.generateChecksum(gymId, gymName, timestamp);
      if (checksum !== expectedChecksum) {
        throw new Error('Invalid QR code');
      }

      return {
        gymId,
        gymName,
        timestamp,
        checksum
      };
    } catch (error) {
      console.error('Error parsing QR code:', error);
      return null;
    }
  }

  /**
   * Generate QR code URL for a gym
   */
  generateQRCodeURL(gymId: number, gymName: string): string {
    const timestamp = Date.now();
    const checksum = this.generateChecksum(gymId, gymName, timestamp);
    
    const params = new URLSearchParams({
      gym: gymId.toString(),
      name: gymName,
      timestamp: timestamp.toString(),
      checksum: checksum
    });

    return `unipass://checkin?${params.toString()}`;
  }

  /**
   * Generate a simple checksum for QR code validation
   */
  private generateChecksum(gymId: number, gymName: string, timestamp: number): string {
    const data = `${gymId}-${gymName}-${timestamp}`;
    let hash = 0;
    
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16).substring(0, 8);
  }

  /**
   * Validate if user is in the correct location for check-in
   */
  validateLocation(
    userLat: number, 
    userLon: number, 
    gymLat: number, 
    gymLon: number
  ): boolean {
    const distance = this.calculateDistance(userLat, userLon, gymLat, gymLon);
    const maxDistance = 0.1; // 100 meters
    
    return distance <= maxDistance;
  }

  /**
   * Calculate distance between two points in kilometers
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    
    const lat1Rad = this.toRadians(lat1);
    const lat2Rad = this.toRadians(lat2);
    const deltaLat = this.toRadians(lat2 - lat1);
    const deltaLon = this.toRadians(lon2 - lon1);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Generate sample QR codes for testing
   */
  generateSampleQRCodes(): { [key: string]: string } {
    return {
      'Smart Fit Centro': this.generateQRCodeURL(1, 'Smart Fit Centro'),
      'Academia Forma': this.generateQRCodeURL(2, 'Academia Forma'),
      'Bio Ritmo': this.generateQRCodeURL(3, 'Bio Ritmo'),
    };
  }
}

export const qrCodeService = new QRCodeService();
export default qrCodeService;
