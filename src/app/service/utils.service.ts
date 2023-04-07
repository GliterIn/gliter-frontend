import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  parseTimestampShort(date: Date) {
    return formatDate(date,'d MMM yyyy','en-US');
  }
  parseTimestamp(date: Date) {
    return formatDate(date,'dd MMM. yyyy, hh:mm a','en-US');
  }

  downscaleImage(
    base64Image: string,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        let scale = 1;

        // Calculate the scale factor based on the maximum dimensions and the aspect ratio
        if (width > maxWidth) {
          scale = maxWidth / width;
        }
        if (height > maxHeight) {
          const heightScale = maxHeight / height;
          scale = Math.min(scale, heightScale);
        }

        // Scale the image down and maintain aspect ratio
        width *= scale;
        height *= scale;

        // Draw the image onto the canvas and convert it back to a base64 string
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsDataURL(blob!);
        });
      };
      img.onerror = () => {
        reject(new Error('Invalid base64 image'));
      };
      img.src = base64Image;
    });
  }
}
