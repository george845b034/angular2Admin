/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Dashboard2Component } from './dashboard2.component';

describe('Dashboard2Component', () => {
  let component: Dashboard2Component;
  let fixture: ComponentFixture<Dashboard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});