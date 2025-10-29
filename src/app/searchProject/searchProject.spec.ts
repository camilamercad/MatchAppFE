import { ComponentFixture, TestBed } from '@angular/core/testing';

import { searchProject } from './searchProject';

describe('Project', () => {
  let component: searchProject;
  let fixture: ComponentFixture<searchProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [searchProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(searchProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
