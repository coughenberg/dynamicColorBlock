import { RippleElement } from './ripple-element/ripple-element.component';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GridForm,
  GridFormState,
} from '../../store/grid-form/grid-form.reducer';
import { Observable } from 'rxjs';
import { selectGridFormData } from '../../store/grid-form/grid-form.selectors';

interface elementPlacementInterface {
  row: number;
  column: number;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  formData$!: Observable<GridForm | null>;

  // /**
  //  * Total row of the large square
  //  */
  // static readonly TOTAL_ROW = 8;

  // /**
  //  * Total column of the large square
  //  */
  // static readonly TOTAL_COLUMN = 8;

  /**
   * Total row of the large square.
   */
  totalRows: number = 8;

  /**
   * Total column of the large square.
   */
  totalColumns: number = 8;

  /**
   * Double list of the laid out elements in the square
   */
  rippleElements: RippleElement[][] = [];

  /**
   * Origin of the initial click
   */
  origin: elementPlacementInterface = {
    row: 0,
    column: 0,
  };

  /**
   * What squares to remove the parent click from
   */
  isSquareEnabledSquaresToFalsify: elementPlacementInterface[] = [];

  constructor(private store: Store<{ form: GridFormState }>) {}

  ngOnInit() {
    this.makeRippleElementsArray();
    this.formData$ = this.store.select(selectGridFormData);
    this.formData$.subscribe((data) => {
      console.warn(data);
      if (!data) return;
      this.totalRows = data.gridSize;
      this.totalColumns = data.gridSize;
      this.makeRippleElementsArray();
    });
  }

  /**
   * Makes the square elements array and initializes each element
   *
   * @param changeArray - Squares that need to make the outline
   * @param repeating - Temp variable to stop the timer from infinitely repeating
   */
  makeRippleElementsArray(changeArray?: elementPlacementInterface[]) {
    const rippleElements: RippleElement[][] = [];
    for (var i: number = 0; i < this.totalRows; i++) {
      rippleElements[i] = [];
      for (var j: number = 0; j < this.totalColumns; j++) {
        rippleElements[i].push(new RippleElement(this.store));
        rippleElements[i][j].rowPlaced = i;
        rippleElements[i][j].columnPlaced = j;
        rippleElements[i][j].clicked = false;
      }
    }

    this.rippleElements = [...rippleElements];
    let upperLeftMostTile: elementPlacementInterface = {
      row: this.totalRows,
      column: this.totalColumns,
    };
    if (changeArray && changeArray.length > 0) {
      changeArray.forEach((change) => {
        this.rippleElements[change.row][change.column].isSquareEnabled = true;
        if (change.row <= upperLeftMostTile.row) {
          upperLeftMostTile.row = change.row;
          if (change.column < upperLeftMostTile.column) {
            upperLeftMostTile.column = change.column;
          }
        }
      });
    }
  }

  /**
   * Colors the left side of the ripple.
   *
   * @param outerLimit - the outer limit of the ripple
   * @param currentRadius - The current radius of the square
   */
  private colorLeft(
    outerLimit: elementPlacementInterface,
    currentRadius: number
  ) {
    const newLimit = {
      row: outerLimit.row - currentRadius,
      column: outerLimit.column - currentRadius,
    };

    this.colorRippleSide(newLimit, currentRadius, false, true, true);
    const previousRadius = currentRadius - 1;
    const oldLimit = {
      row: outerLimit.row - previousRadius,
      column: outerLimit.column - previousRadius,
    };
    this.colorRippleSide(oldLimit, previousRadius, false, true, false);
  }

  /**
   * Colors the bottom side of the ripple.
   *
   * @param outerLimit - the outer limit of the ripple
   * @param currentRadius - The current radius of the square
   */
  private colorBottom(
    outerLimit: elementPlacementInterface,
    currentRadius: number
  ) {
    const newLimit = {
      row: outerLimit.row + currentRadius,
      column: outerLimit.column - currentRadius,
    };
    this.colorRippleSide(newLimit, currentRadius, true, true, true);

    const previousRadius = currentRadius - 1;
    const oldLimit = {
      row: outerLimit.row + previousRadius,
      column: outerLimit.column - previousRadius,
    };
    this.colorRippleSide(oldLimit, previousRadius, true, true, false);
  }

  /**
   * Colors the right side of the ripple.
   *
   * @param outerLimit - the outer limit of the ripple
   * @param currentRadius - The current radius of the square
   */
  private colorRight(
    outerLimit: elementPlacementInterface,
    currentRadius: number
  ) {
    const newLimit = {
      row: outerLimit.row + currentRadius,
      column: outerLimit.column + currentRadius,
    };
    this.colorRippleSide(newLimit, currentRadius, false, false, true);

    const previousRadius = currentRadius - 1;
    const oldLimit = {
      row: outerLimit.row + previousRadius,
      column: outerLimit.column + previousRadius,
    };
    this.colorRippleSide(oldLimit, previousRadius, false, false, false);
  }

  /**
   * Colors the top side of the ripple.
   *
   * @param outerLimit - the outer limit of the ripple
   * @param currentRadius - The current radius of the square
   */
  private colorTop(
    outerLimit: elementPlacementInterface,
    currentRadius: number
  ) {
    const newLimit = {
      row: outerLimit.row - currentRadius,
      column: outerLimit.column + currentRadius,
    };
    this.colorRippleSide(newLimit, currentRadius, true, false, true);

    const previousRadius = currentRadius - 1;
    const oldLimit = {
      row: outerLimit.row - previousRadius,
      column: outerLimit.column + previousRadius,
    };
    this.colorRippleSide(oldLimit, previousRadius, true, false, false);
  }

  /**
   * Colors the outter sides based on the most recently colored buttons
   * @param upperLeftMostTile - placement of the tile on the upper left of the most recent outline of tiles
   *
   * @returns The new upperLeftMostTile, if there is one
   */
  colorOutterSides(
    outerLimit: {
      topLeft: elementPlacementInterface;
      bottomLeft: elementPlacementInterface;
      bottomRight: elementPlacementInterface;
      topRight: elementPlacementInterface;
    },
    radius: number
  ) {
    this.colorLeft(outerLimit.topLeft, radius);
    this.colorBottom(outerLimit.bottomLeft, radius);
    this.colorRight(outerLimit.bottomRight, radius);
    this.colorTop(outerLimit.topRight, radius);
  }

  /**
   * Gives the radius as a positive or negative number to be applied
   *
   * @param positiveIncrement The direction to move
   * @param radius The amount to move
   * @returns The direction and amount to move
   */
  private applyRadius(positiveIncrement: boolean, radius: number): number {
    return positiveIncrement ? radius : -radius;
  }

  /**
   * Applies or removes colors from a specific side of the shape clicked
   *
   * @param origin - origin of the corner
   * @param maxRadius - the maximum radius to move
   * @param isHorizontalMoving - whether the line should move horizontally or vertically
   * @param isPositiveIncrement - whether the line moves in a positive or negative increment
   * @param hasColor - whether the square should gain or lose color
   */
  colorRippleSide(
    origin: elementPlacementInterface,
    maxRadius: number,
    isHorizontalMoving: boolean,
    isPositiveIncrement: boolean,
    hasColor: boolean
  ) {
    for (let radius = 0; radius <= maxRadius * 2; radius++) {
      const movementRadius = this.applyRadius(isPositiveIncrement, radius);
      if (isHorizontalMoving) {
        if (
          origin.row >= 0 &&
          origin.row < this.totalRows &&
          origin.column + movementRadius >= 0 &&
          origin.column + movementRadius < this.totalColumns
        ) {
          this.rippleElements[origin.row][
            origin.column + movementRadius
          ].isSquareEnabled = hasColor;
        }
      } else {
        if (
          origin.row + movementRadius >= 0 &&
          origin.row + movementRadius < this.totalRows &&
          origin.column >= 0 &&
          origin.column < this.totalColumns
        ) {
          this.rippleElements[origin.row + movementRadius][
            origin.column
          ].isSquareEnabled = hasColor;
        }
      }
    }
  }

  /**
   * Gets the child button that has been pressed
   *
   * @param elementClicked - The button that has been pressed
   */
  startRipple(elementClicked: RippleElement) {
    this.rippleElements[elementClicked.rowPlaced][
      elementClicked.columnPlaced
    ].clicked = true;
    this.origin = {
      row: elementClicked.rowPlaced,
      column: elementClicked.columnPlaced,
    };
    const outerLimit = {
      topLeft: this.origin,
      bottomLeft: this.origin,
      bottomRight: this.origin,
      topRight: this.origin,
    };
    for (let index = 1; index <= this.totalRows; index++) {
      setTimeout(() => {
        if (index === 1) {
          this.rippleElements[elementClicked.rowPlaced][
            elementClicked.columnPlaced
          ].clicked = false;
        }
        this.colorOutterSides(outerLimit, index);
      }, index * 75);
    }
  }

  /**
   * Returns whether the current square has been clicked by the parent class.
   * Used to get parent class clicked input
   *
   * @param row - Row of current button
   * @param column - Column of current button
   */
  getSquareEnabled(row: number, column: number): boolean {
    if (
      this.rippleElements[row + 1] &&
      this.rippleElements[row + 1][column + 1] &&
      this.rippleElements[row + 1][column + 1].isSquareEnabled
    ) {
      this.rippleElements[row + 1][column + 1].isSquareEnabled = true;
    }
    return this.rippleElements[row][column].isSquareEnabled != null
      ? this.rippleElements[row][column].isSquareEnabled
      : false;
  }

  /**
   * Returns whether the currentSquare has been clicked by the child class.
   * Used to get user clicked input
   *
   * @param row - Row of current button
   * @param column - Column of current button
   */
  getClicked(row: number, column: number): boolean {
    return this.rippleElements[row][column].clicked;
  }
}
