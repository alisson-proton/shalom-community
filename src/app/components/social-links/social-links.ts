import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-links',
  imports: [CommonModule],
  templateUrl: './social-links.html',
  styleUrl: './social-links.css',
})
export class SocialLinks {
  socialLinks = [
    {
      name: 'YouTube',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg',
      url: 'https://www.youtube.com/@ComunidadeShalom',
      description: 'Cultos ao vivo, pregações e worship',
      color: '#ff0000'
    },
    {
      name: 'Instagram',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
      url: 'https://www.instagram.com/comunidadeshalom_/',
      description: 'Fotos, reels e novidades da comunidade',
      color: '#e1306c'
    },
    {
      name: 'Facebook',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg',
      url: 'https://www.facebook.com/comunidadeshalom',
      description: 'Eventos, grupos e atualizações',
      color: '#1877f2'
    },
    {
      name: 'TikTok',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg',
      url: 'https://www.tiktok.com/@comunidadeshalom',
      description: 'Vídeos curtos e momentos especiais',
      color: '#00f2ea'
    },
    {
      name: 'Spotify',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg',
      url: 'https://open.spotify.com/comunidadeshalom',
      description: 'Playlists e podcasts da comunidade',
      color: '#1db954'
    },
    {
      name: 'WhatsApp',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg',
      url: 'https://wa.me/5543999999999',
      description: 'Fale conosco pelo WhatsApp',
      color: '#25d366'
    }
  ];
}
