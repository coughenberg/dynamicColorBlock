import { SquareElement } from './square_element/element-square.component';
import { Component, ContentChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface elementPlacementInterface {
  height: number;
  width: number;
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
   * Total height of the large square
   */
  static readonly TOTAL_HEIGHT = 8;

  /**
   * Total width of the large square
   */
  static readonly TOTAL_WIDTH = 8;

  /**
   * Double list of the laid out elements in the square
   */
  squareElements: SquareElement[][] = [];

  /**
   * Origin of the initial click
   */
  origin: elementPlacementInterface = {
    height: 0,
    width: 0,
  };

  /**
   * What squares to remove the parent click from
   */
  parentClickSquaresToFalsify: elementPlacementInterface[] = [];

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
    for (var i: number = 0; i < LargeSquareComponent.TOTAL_HEIGHT; i++) {
      squareElements[i] = [];
      for (var j: number = 0; j < LargeSquareComponent.TOTAL_WIDTH; j++) {
        squareElements[i].push(new SquareElement());
        squareElements[i][j].heightPlaced = i;
        squareElements[i][j].widthPlaced = j;
        squareElements[i][j].clicked = false;
        // squareElements[i][j].clicked = this.squareElements && this.squareElements[i] && this.squareElements[i][j] && this.squareElements[i][j].clicked ? this.squareElements[i][j].clicked : false;
      }
    }

    this.squareElements = squareElements;
    let upperLeftMostTile: elementPlacementInterface = {
      height: LargeSquareComponent.TOTAL_HEIGHT,
      width: LargeSquareComponent.TOTAL_WIDTH,
    };
    if (changeArray && changeArray.length > 0) {
      changeArray.forEach((change) => {
        this.squareElements[change.height][change.width].parentClick = true;
        if (change.height <= upperLeftMostTile.height) {
          upperLeftMostTile.height = change.height;
          if (change.width < upperLeftMostTile.width) {
            upperLeftMostTile.width = change.width;
            console.log(change.width);
          }
        }
      });
    }
  }

  /**
   * Colors the outter sides based on the most recently colored buttons
   * @param upperLeftMostTile - placement of the tile on the upper left of the most recent outline of tiles
   *
   * @returns The new upperLeftMostTile, if there is one
   */
  colorOutterSides(
    upperLeftMostTile: elementPlacementInterface
  ): elementPlacementInterface {
    this.parentClickSquaresToFalsify = [];
    const leftOfUpperLeftMostTile: elementPlacementInterface = {
      height: upperLeftMostTile.height,
      width: upperLeftMostTile.width - 1,
    };
    let lastTileFilled: elementPlacementInterface;
    lastTileFilled = this.colorThisSide(
      leftOfUpperLeftMostTile.height,
      leftOfUpperLeftMostTile.width,
      false,
      true,
      leftOfUpperLeftMostTile.height,
      leftOfUpperLeftMostTile.width + 1
    );
    lastTileFilled = this.colorThisSide(
      lastTileFilled.height,
      lastTileFilled.width,
      true,
      true,
      lastTileFilled.height - 1,
      lastTileFilled.width
    );
    lastTileFilled = this.colorThisSide(
      lastTileFilled.height,
      lastTileFilled.width,
      false,
      false,
      lastTileFilled.height,
      lastTileFilled.width - 1
    );
    lastTileFilled = this.colorThisSide(
      lastTileFilled.height,
      lastTileFilled.width,
      true,
      false,
      lastTileFilled.height + 1,
      lastTileFilled.width
    );
    const lastSquare = this.parentClickSquaresToFalsify.pop() ?? {
      height: 0,
      width: 0,
    };
    this.parentClickSquaresToFalsify.forEach((square) => {
      this.squareElements[square.height][square.width].parentClick = false;
    });
    return { height: lastSquare.height - 1, width: lastSquare.width };
  }

  /**
   * Colors the current side of the outline. It will always get a connected tile, via the connectedHeight and connectedWidth, to check if the current tile should be colored or not.
   * The current tile will only be colored if the connected tile is colored.
   *
   * @param currHeight - Current height of the tile to color in
   * @param currWidth  - Current width of the tile to color in
   * @param isHorizontalMoving - Whether the outline is currently coloring in horizontally or vertically
   * @param isPositiveIncrement - Whether the outline is currently coloring in the positive or negative direction
   * @param connectedHeight - The row for the connected tile to check if it is colored
   * @param connectedWidth - The column for the connected tile to check if it is colored
   */
  colorThisSide(
    currHeight: number,
    currWidth: number,
    isHorizontalMoving: boolean,
    isPositiveIncrement: boolean,
    connectedHeight: number,
    connectedWidth: number
  ): elementPlacementInterface {
    let first = true;
    let lastSquare: elementPlacementInterface = { height: 0, width: 0 };
    if (
      currHeight < 0 ||
      currHeight > LargeSquareComponent.TOTAL_HEIGHT - 1 ||
      currWidth < 0 ||
      currWidth > LargeSquareComponent.TOTAL_WIDTH - 1
    ) {
      lastSquare = this.uncolorThisSide(
        isHorizontalMoving,
        isPositiveIncrement,
        connectedHeight,
        connectedWidth
      );
    } else {
      while (
        this.squareElements[currHeight] &&
        this.squareElements[currHeight][currWidth] &&
        (this.squareElements[connectedHeight][connectedWidth].parentClick ||
          (this.origin.height === connectedHeight &&
            this.origin.width === connectedWidth) ||
          first)
      ) {
        this.squareElements[currHeight][currWidth].parentClick = true;
        if (!first) {
          this.parentClickSquaresToFalsify.push({
            height: connectedHeight,
            width: connectedWidth,
          });
        }
        first = false;
        if (isHorizontalMoving) {
          if (isPositiveIncrement) {
            currWidth++;
            connectedWidth++;
          } else {
            currWidth--;
            connectedWidth--;
          }
        } else {
          if (isPositiveIncrement) {
            currHeight++;
            connectedHeight++;
          } else {
            currHeight--;
            connectedHeight--;
          }
        }
        lastSquare = { height: currHeight, width: currWidth };
      }
    }
    return lastSquare;
  }

  /**
   * Uncolors the given side
   *
   * @param isHorizontalMoving - Whether the outline is currently coloring in horizontally or vertically
   * @param isPositiveIncrement - Whether the outline is currently coloring in the positive or negative direction
   * @param connectedHeight - The row for the connected tile to check if it is colored
   * @param connectedWidth - The column for the connected tile to check if it is colored
   */
  uncolorThisSide(
    isHorizontalMoving: boolean,
    isPositiveIncrement: boolean,
    connectedHeight: number,
    connectedWidth: number
  ): elementPlacementInterface {
    let nextBlock: number | undefined;
    while (
      this.squareElements[connectedHeight] &&
      this.squareElements[connectedHeight][connectedWidth] &&
      this.hasNextCheckedBlock(
        connectedHeight,
        connectedWidth,
        isHorizontalMoving,
        nextBlock
      )
    ) {
      if (isHorizontalMoving) {
        if (isPositiveIncrement) {
          connectedWidth++;
          nextBlock = connectedWidth + 1;
        } else {
          connectedWidth--;
          nextBlock = connectedWidth - 1;
        }
      } else {
        if (isPositiveIncrement) {
          connectedHeight++;
          nextBlock = connectedHeight + 1;
        } else {
          connectedHeight--;
          nextBlock = connectedHeight - 1;
        }
      }
      if (
        this.edgeOfLargeSquare(
          connectedHeight,
          connectedWidth,
          nextBlock,
          isHorizontalMoving
        )
      ) {
        this.squareElements[connectedHeight][connectedWidth].parentClick =
          false;
      }
    }
    if (isHorizontalMoving) {
      if (isPositiveIncrement) {
        connectedWidth++;
        nextBlock = connectedWidth + 1;
      } else {
        connectedWidth--;
        nextBlock = connectedWidth - 1;
      }
    } else {
      if (isPositiveIncrement) {
        connectedHeight++;
        nextBlock = connectedHeight + 1;
      } else {
        connectedHeight--;
        nextBlock = connectedHeight - 1;
      }
    }
    return { height: connectedHeight, width: connectedWidth };
  }

  /**
   * Whether the square is touching the corner of the larger square or not
   *
   * @param elementSquareHeight - Height of current square to evaluate
   * @param elementSquareWidth - Width of current square to evaluate
   */
  edgeOfLargeSquare(
    elementSquareHeight: number,
    elementSquareWidth: number,
    nextBlock: number,
    isHorizontalMoving: boolean
  ): boolean {
    const endOfMadeSquare: boolean = isHorizontalMoving
      ? this.squareElements[elementSquareHeight][nextBlock] &&
        this.squareElements[elementSquareHeight][nextBlock].parentClick
      : this.squareElements[nextBlock] &&
        this.squareElements[nextBlock][elementSquareWidth] &&
        this.squareElements[nextBlock][elementSquareWidth].parentClick;
    // return elementSquareHeight <= 0 && elementSquareWidth >= LargeSquareComponent.TOTAL_WIDTH - 1 ||
    //   elementSquareHeight <= 0 && elementSquareWidth <= 0 ||
    //   elementSquareWidth <= 0 && elementSquareHeight >= LargeSquareComponent.TOTAL_HEIGHT - 1 ||
    //   elementSquareWidth <= 0 && elementSquareHeight <= 0 ||
    //   elementSquareWidth >= LargeSquareComponent.TOTAL_WIDTH - 1 && elementSquareHeight >= LargeSquareComponent.TOTAL_HEIGHT - 1;
    return (
      elementSquareHeight <= 0 ||
      elementSquareHeight >= LargeSquareComponent.TOTAL_HEIGHT - 1 ||
      elementSquareWidth <= 0 ||
      elementSquareWidth >= LargeSquareComponent.TOTAL_WIDTH - 1
    );
  }

  hasNextCheckedBlock(
    elementSquareHeight: number,
    elementSquareWidth: number,
    isHorizontalMoving: boolean,
    nextBlock?: number
  ) {
    if (!nextBlock) {
      return true;
    }
    return isHorizontalMoving
      ? this.squareElements[elementSquareHeight][nextBlock] &&
          this.squareElements[elementSquareHeight][nextBlock].parentClick
      : this.squareElements[nextBlock] &&
          this.squareElements[nextBlock][elementSquareWidth] &&
          this.squareElements[nextBlock][elementSquareWidth].parentClick;
  }

  /**
   * Gets the child button that has been pressed
   *
   * @param elementClicked - The button that has been pressed
   */
  displayClickedFromParent(elementClicked: SquareElement) {
    this.squareElements[elementClicked.heightPlaced][
      elementClicked.widthPlaced
    ].clicked = true;
    this.origin = {
      height: elementClicked.heightPlaced,
      width: elementClicked.widthPlaced,
    };
    let nextUpperLeftPosition: elementPlacementInterface = {
      height: elementClicked.heightPlaced,
      width: elementClicked.widthPlaced,
    };
    for (
      let index = 1;
      index < LargeSquareComponent.TOTAL_HEIGHT + 1;
      index++
    ) {
      setTimeout(() => {
        if (index === 1) {
          this.squareElements[elementClicked.heightPlaced][
            elementClicked.widthPlaced
          ].clicked = false;
        }
        nextUpperLeftPosition = this.colorOutterSides(nextUpperLeftPosition);
      }, index * 600);
    }
  }

  /**
   * Returns whether the current square has been clicked by the parent class.
   * Used to get parent class clicked input
   *
   * @param height - Row of current button
   * @param width - Column of current button
   */
  getParentClick(height: number, width: number): boolean {
    if (
      this.squareElements[height + 1] &&
      this.squareElements[height + 1][width + 1] &&
      this.squareElements[height + 1][width + 1].parentClick
    ) {
      this.squareElements[height + 1][width + 1].parentClick = true;
    }
    return this.squareElements[height][width].parentClick != null
      ? this.squareElements[height][width].parentClick
      : false;
  }

  /**
   * Returns whether the currentSquare has been clicked by the child class.
   * Used to get user clicked input
   *
   * @param height - Row of current button
   * @param width - Column of current button
   */
  getClicked(height: number, width: number): boolean {
    return this.squareElements[height][width].clicked;
  }
}
