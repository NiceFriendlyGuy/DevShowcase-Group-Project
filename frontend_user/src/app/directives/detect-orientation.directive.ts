import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appDetectOrientation]'
})
export class DetectOrientationDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    /*
    const img: HTMLImageElement = this.el.nativeElement;

    const applyOrientationClass = () => {
      if (img.naturalHeight > img.naturalWidth) {
        const container = img.closest('.project-main-image');
        if (container) {
          this.renderer.addClass(container, 'portrait');
        }
      }
    };

    if (img.complete) {
      applyOrientationClass();
    } else {
      img.onload = applyOrientationClass;
    }
  */
   }
    
}
