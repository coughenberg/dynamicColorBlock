import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ripple-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'ripple-element.component.html',
  styleUrls: ['./ripple-element.component.css'],
})
export class RippleElement implements OnInit {
  /**
   * Row the element was placed
   */
  @Input()
  rowPlaced: number = 0;

  /**
   * Column the element was placed
   */
  @Input()
  columnPlaced: number = 0;

  /**
   * True if this square is enabled from being clicked or the ripple outwards
   */
  @Input()
  isSquareEnabled: boolean = false;

  /**
   * Whether the button was clicked or not
   */
  @Input()
  clicked: boolean = false;

  /**
   * Tells parent which element has been clicked
   */
  @Output()
  newClick = new EventEmitter<RippleElement>();

  constructor() {}

  ngOnInit() {}

  givePlacement(): void {
    this.clicked = !this.clicked;
    this.newClick.emit(this);
  }
}
