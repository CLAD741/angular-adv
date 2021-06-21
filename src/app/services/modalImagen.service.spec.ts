/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalImagenService } from './modalImagen.service';

describe('Service: ModalImagen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalImagenService]
    });
  });

  it('should ...', inject([ModalImagenService], (service: ModalImagenService) => {
    expect(service).toBeTruthy();
  }));
});
