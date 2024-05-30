import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'element-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'element-square.component.html',
  styleUrls: ['./element-square.component.css'],
})
export class SquareElement implements OnInit {
  /**
   * Height the element was placed
   */
  @Input()
  heightPlaced: number = 0;

  /**
   * Width the element was placed
   */
  @Input()
  widthPlaced: number = 0;

  /**
   * True if the parent class has clicked this element
   */
  @Input()
  parentClick: boolean = false;

  /**
   * Whether the button was clicked or not
   */
  @Input()
  clicked: boolean = false;

  /**
   * Tells parent which element has been clicked
   */
  @Output()
  newClick = new EventEmitter<SquareElement>();

  constructor() {}

  ngOnInit() {}

  givePlacement(): void {
    this.clicked = !this.clicked;
    this.newClick.emit(this);
  }
}
