import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.scss']
})
export class AboutUs {
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/6ZFsJ9GzHUo'
    );
  }
}
