import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GridForm,
  GridFormState,
} from '../../../store/grid-form/grid-form.reducer';
import { Observable } from 'rxjs';
import { selectGridFormData } from '../../../store/grid-form/grid-form.selectors';

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
  baseColor: string = 'blue';

  /**
   * The ripple color of the clickable area.
   */
  rippleColor: string = 'red';

  constructor(private store: Store<{ form: GridFormState }>) {}

  ngOnInit() {
    this.formData$ = this.store.select(selectGridFormData);
    this.formData$.subscribe((data) => {
      console.warn(data);
      if (!data) return;
      if (data.baseColor) {
        this.baseColor = data.baseColor;
      }
      if (data.rippleColor) {
        this.rippleColor = data.rippleColor;
      }
    });
  }

  givePlacement(): void {
    this.clicked = !this.clicked;
    this.newClick.emit(this);
  }
}
