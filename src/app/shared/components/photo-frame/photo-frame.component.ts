import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit {

    @Output() public liked: EventEmitter<void> = new EventEmitter();
    @Input() public description: string = '';
    @Input() public src: string = '';
    @Input() public likes: number = 0;
    private debounceSubject: Subject<void> = new Subject();

    public ngOnInit(): void {
        this.debounceSubject
            .asObservable()
            .pipe(debounceTime(500))
            .subscribe(() => this.liked.emit())
    }

    
    public like(): void {
        this.debounceSubject.next();
    }
}