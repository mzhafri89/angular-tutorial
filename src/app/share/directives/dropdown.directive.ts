import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  //showDropdown: boolean;

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') click() {
    this.isOpen = !this.isOpen;
  }

  //use renderer - better to use host binding so that we dont have to access dom directly

  // constructor(private element: ElementRef, private renderer: Renderer2) {}

  // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  // }

  // manipulateHostClass(showDropdown: boolean) {
  //   if (showDropdown) {
  //     this.renderer.addClass(this.element.nativeElement, 'open');
  //     return;
  //   }

  //   this.renderer.removeClass(this.element.nativeElement, 'open');
  // }
}
