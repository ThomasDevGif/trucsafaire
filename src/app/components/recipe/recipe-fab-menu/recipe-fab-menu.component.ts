import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-recipe-fab-menu',
  templateUrl: './recipe-fab-menu.component.html',
  styleUrls: ['./recipe-fab-menu.component.scss']
})
export class RecipeFabMenuComponent implements OnInit {

  public isMenuOpen = false;
  public isEditAnimation = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Add toggle animation
   */
  animate(x, field) {
    $(field).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(field).removeClass(x + ' animated');
    });
  }

  /**
   * Toggle fabs
   */
  fabMenuClickListener($event) {
    if (!this.isMenuOpen) {
      this.openMenu($event);
    } else {
      this.closeMenu();
    }
  }

  /**
   * Open with animation the 3 fabs mini
   */
  openMenu(e) {
      const self = this;
    e.preventDefault();
    $('.fab-menu-area').delay(40).fadeIn();
      const animationFab = 'bounceIn';
      const anim_this = 'pulse';
    $('.fab-menu-content').delay(150).fadeIn();
    $('label').delay(100).fadeIn();
    self.animate(animationFab, '.fab-menu-content');
      self.animate(anim_this, this);
    $('fab-menu-content').focus();
    self.isMenuOpen = true;
    this.isEditAnimation = true; // Prepare animation for edit icon
  }

  /**
   * Hide the 3 fabs mini
   */
  closeMenu() {
    $('#icon-edit').addClass('animated rotateIn');
    $('.fab-menu-area').delay(100).fadeOut();
    $('label').delay(50).fadeOut();
    this.isMenuOpen = false;
  }

}
