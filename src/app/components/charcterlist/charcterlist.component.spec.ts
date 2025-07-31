import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharcterlistComponent } from './charcterlist.component';

describe('CharcterlistComponent', () => {
  let component: CharcterlistComponent;
  let fixture: ComponentFixture<CharcterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharcterlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharcterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
