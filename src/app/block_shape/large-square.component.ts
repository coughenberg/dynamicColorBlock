import { SquareElement } from './square_element/element-square.component';
import { Component, ContentChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface elementPlacementInterface {
  row: number;
  column: number;
}

@Component({
  selector: 'large-square',
  standalone: true,
  imports: [CommonModule, SquareElement],
  templateUrl: './large-square.component.html',
  styleUrls: ['./large-square.component.css'],
})
export class LargeSquareComponent implements OnInit {
  /**
   * Total row of the large square
   */
  static readonly TOTAL_ROW = 8;

  /**
   * Total column of the large square
   */
  static readonly TOTAL_COLUMN = 8;

  /**
   * Double list of the laid out elements in the square
   */
  squareElements: SquareElement[][] = [];

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

  constructor() {
    this.makeSquareElementsArray();
  }

  ngOnInit() {}

  /**
   * Makes the square elements array and initializes each element
   *
   * @param changeArray - Squares that need to make the outline
   * @param repeating - Temp variable to stop the timer from infinitely repeating
   */
  makeSquareElementsArray(
    changeArray?: elementPlacementInterface[],
    repeating?: boolean
  ) {
    const squareElements: SquareElement[][] = [];
    for (var i: number = 0; i < LargeSquareComponent.TOTAL_ROW; i++) {
      squareElements[i] = [];
      for (var j: number = 0; j < LargeSquareComponent.TOTAL_COLUMN; j++) {
        squareElements[i].push(new SquareElement());
        squareElements[i][j].rowPlaced = i;
        squareElements[i][j].columnPlaced = j;
        squareElements[i][j].clicked = false;
        // squareElements[i][j].clicked = this.squareElements && this.squareElements[i] && this.squareElements[i][j] && this.squareElements[i][j].clicked ? this.squareElements[i][j].clicked : false;
      }
    }

    this.squareElements = squareElements;
    let upperLeftMostTile: elementPlacementInterface = {
      row: LargeSquareComponent.TOTAL_ROW,
      column: LargeSquareComponent.TOTAL_COLUMN,
    };
    if (changeArray && changeArray.length > 0) {
      changeArray.forEach((change) => {
        this.squareElements[change.row][change.column].isSquareEnabled = true;
        if (change.row <= upperLeftMostTile.row) {
          upperLeftMostTile.row = change.row;
          if (change.column < upperLeftMostTile.column) {
            upperLeftMostTile.column = change.column;
            console.log(change.column);
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
          origin.row < LargeSquareComponent.TOTAL_ROW &&
          origin.column + movementRadius >= 0 &&
          origin.column + movementRadius < LargeSquareComponent.TOTAL_COLUMN
        ) {
          this.squareElements[origin.row][
            origin.column + movementRadius
          ].isSquareEnabled = hasColor;
        }
      } else {
        if (
          origin.row + movementRadius >= 0 &&
          origin.row + movementRadius < LargeSquareComponent.TOTAL_ROW &&
          origin.column >= 0 &&
          origin.column < LargeSquareComponent.TOTAL_COLUMN
        ) {
          this.squareElements[origin.row + movementRadius][
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
  startRipple(elementClicked: SquareElement) {
    this.squareElements[elementClicked.rowPlaced][
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
    for (let index = 1; index <= LargeSquareComponent.TOTAL_ROW; index++) {
      setTimeout(() => {
        if (index === 1) {
          this.squareElements[elementClicked.rowPlaced][
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
      this.squareElements[row + 1] &&
      this.squareElements[row + 1][column + 1] &&
      this.squareElements[row + 1][column + 1].isSquareEnabled
    ) {
      this.squareElements[row + 1][column + 1].isSquareEnabled = true;
    }
    return this.squareElements[row][column].isSquareEnabled != null
      ? this.squareElements[row][column].isSquareEnabled
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
    return this.squareElements[row][column].clicked;
  }
}
