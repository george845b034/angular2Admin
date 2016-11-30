/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToolsService } from './tools.service';

describe('ToolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolsService]
    });
  });

  it('should ...', inject([ToolsService], (service: ToolsService) => {
    expect(service).toBeTruthy();
  }));
});
