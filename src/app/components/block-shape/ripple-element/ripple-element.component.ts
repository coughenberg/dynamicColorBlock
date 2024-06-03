import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridFormState } from '../../../store/grid-form/grid-form.reducer';
import { Observable } from 'rxjs';
import { selectGridFormData } from '../../../store/grid-form/grid-form.selectors';
import { GridForm } from '../../../models/grid-form.model';

@Component({
  selector: 'app-ripple-element',
  templateUrl: 'ripple-element.component.html',
  styleUrls: ['./ripple-element.component.css'],
})
export class RippleElement implements OnInit {
  formData$!: Observable<GridForm | null>;

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

  /**
   * The base color of the clickable area.
   */
  baseColor: string = 'lightcyan';

  /**
   * The ripple color of the clickable area.
   */
  rippleColor: string = 'lightseagreen';

  /**
   * Whether the button should contain a border or not.
   */
  hasBorder: boolean = false;

  /**
   * The height of a ripple element.
   */
  blockHeight = '7.5em';
  /**
   * The width of a ripple element.
   */
  blockWidth = '7.5em';

  constructor(private store: Store<{ form: GridFormState }>) {}

  ngOnInit() {
    this.formData$ = this.store.select(selectGridFormData);
    this.formData$.subscribe((data) => {
      if (!data) return;
      if (data.gridHeight) {
        this.blockHeight = `${72 / data.gridHeight}em`;
      }
      if (data.gridWidth) {
        this.blockWidth = `${72 / data.gridWidth}em`;
      }
      if (data.baseColor) {
        this.baseColor = data.baseColor;
      }
      if (data.rippleColor) {
        this.rippleColor = data.rippleColor;
      }
      this.hasBorder = data.hasBorder;
    });
  }

  givePlacement(): void {
    this.clicked = !this.clicked;
    this.newClick.emit(this);
  }
}
