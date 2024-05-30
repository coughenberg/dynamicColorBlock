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
  newClick = new EventEmitter<SquareElement>();

  constructor() {}

  ngOnInit() {}

  givePlacement(): void {
    this.clicked = !this.clicked;
    this.newClick.emit(this);
  }
}
