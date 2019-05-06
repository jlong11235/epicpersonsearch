import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

function coerceToBoolean(input: string | boolean): boolean {
  return !!input && input !== 'false';
}

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CustomPaginatorComponent {
  //CACI-4533
  //tracks indexes and sizes, main functionality is handled by pagination-controls directive
  //and pagination service
  @Input() id: string;
  @Input() maxSize: number = 7;
  @Input()
  get directionLinks(): boolean{
    return this._directionLinks;
  }
  set directionLinks(value: boolean){
    this._directionLinks = coerceToBoolean(value);
  }
  @Input()
  get autoHide(): boolean{
    return this._autoHide;
  }
  set autoHide(value: boolean){
    this._autoHide = coerceToBoolean(value);
  }
  @Input()
  get responsive(): boolean{
    return this._responsive;
  }
  set responsive(value: boolean){
    this._responsive = coerceToBoolean(value);
  }
  @Input() previousLabel: string = '';
  @Input() nextLabel: string = '';
  @Input() screenReaderPaginationLabel: string = 'Pagination';
  @Input() screenReaderPageLabel: string = 'page';
  @Input() screenReaderCurrentLabel: string = `You're on page`;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  private _directionLinks: boolean = true;
  private _autoHide: boolean = false;
  private _responsive: boolean = false;
}
