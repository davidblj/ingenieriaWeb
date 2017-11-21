import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsRecordComponent } from './transactions-record.component';

describe('TransactionsRecordComponent', () => {
  let component: TransactionsRecordComponent;
  let fixture: ComponentFixture<TransactionsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
