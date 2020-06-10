import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component ({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent {
    starWidth: number;
    @Input() rating: number;
    @Output () ratingClicked: EventEmitter <string> = new EventEmitter<string>();
    ngOnChanges () {
        this.starWidth = this.rating * 75 / 5;
    }
    onClick() {
        console.log(`The rating ${this.rating} was clicked!`)
        this.ratingClicked.emit(this.rating as unknown as string);
    }
}