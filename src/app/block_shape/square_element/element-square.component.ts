import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'element-square',
    templateUrl: 'element-square.component.html',
    styleUrls: ['./element-square.component.css']
})

export class SquareElement implements OnInit {
    /**
     * Height the element was placed
     */
    @Input()
    heightPlaced: number;

    /**
     * Width the element was placed
     */
    @Input()
    widthPlaced: number;

    /**
     * True if the parent class has clicked this element
     */
    @Input()
    parentClick: boolean;

    /**
     * Whether the button was clicked or not
     */
    @Input()
    clicked: boolean = false;

    /**
     * Tells parent which element has been clicked
     */
    @Output()
    newClick = new EventEmitter<Object>();

    constructor() { }

    ngOnInit() {
    }

    givePlacement(): void {
        this.clicked = !this.clicked;
        this.newClick.emit(this);
    }
}