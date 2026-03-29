import { Component, AfterViewInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
// @ts-ignore
import confetti from 'canvas-confetti';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-bdcus-2',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './bdcus-2.component.html',
  styleUrl: './bdcus-2.component.css',
})
export class Bdcus2Component implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  customer = signal<any>(null);
  showMessage = signal<boolean>(false);
  videoUrl = signal<SafeResourceUrl | null>(null);

  floatingElements = ['🎈', '❤️', '✨', '🌸', '💖'];
  fruits = ['🍓', '🍒', '🫐', '🍓', '🍇'];

  async ngAfterViewInit() {
    try {
      const response = await fetch('/customers.json');
      const allCustomers = await response.json();

      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        const found = allCustomers.find((c: any) => c.id === id);

        if (found) {
          this.customer.set(found);
          setTimeout(() => this.startSequence(), 500);
        }
      });
    } catch (error) {
      console.error('Data loading error:', error);
    }
  }

  startSequence() {
    const data = this.customer();
    if (!data) return;

    const tl = gsap.timeline();
    this.animateBackground();

    tl.to('#main-typewriter', {
      duration: 3.5,
      text: data.shortIntro || 'Happy Birthday!',
      ease: 'none',
    });

    tl.from('.cake-container', {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
    }, '-=1');

    tl.from('.topping', {
      y: -800,
      opacity: 0,
      duration: 2.5,
      stagger: 0.4,
      ease: 'power1.out',
    }, '-=1');

    tl.to('#action-btn', {
      opacity: 1,
      y: -10,
      duration: 0.8,
    });
  }

  animateBackground() {
    gsap.utils.toArray<HTMLElement>('.floating-item').forEach((item) => {
      gsap.set(item, {
        x: gsap.utils.random(0, window.innerWidth - 50),
        y: window.innerHeight + 50,
      });
      gsap.to(item, {
        y: -100,
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        ease: 'none',
      });
    });
  }

  openSpecialDialog() {
    const data = this.customer();

    if (data?.youtubeId) {
      // Logic for YouTube
      const url = `https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&mute=0`;
      this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    } else if (data?.videoFile) {
      // Logic for MP4
      this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(data.videoFile));
    }

    this.showMessage.set(true);

    setTimeout(() => {
      gsap.to('#dialog-typewriter', {
        duration: 6,
        text: data.longMessage || 'Wishing you all the best!',
        ease: 'none',
      });
    }, 500);
  }

  popFruit(event: MouseEvent, index: number) {
    const id = `#fruit-${index}`;
    gsap.to(id, { scale: 1.8, opacity: 0, duration: 0.3 });

    confetti({
      particleCount: 40,
      spread: 50,
      origin: {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      },
    });
  }
}