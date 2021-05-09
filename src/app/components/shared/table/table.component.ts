import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  @Input() records: any[];
  @Output() tryEdit = new EventEmitter<string>();
  @Output() tryDelete = new EventEmitter<string>();
  keys: string[];

  ngOnChanges(): void {
    this.keys = Object.keys(this.records[0]);
  }

  constructor() {}

  edit(id): void {
    this.tryEdit.emit(id);
  }

  delete(id): void {
    this.tryDelete.emit(id);
  }
}
