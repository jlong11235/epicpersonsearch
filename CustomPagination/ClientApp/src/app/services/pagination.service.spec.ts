import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';
import {PaginationControl} from "../models/pagination-control";

describe('PaginationService', () => {
  let paginationService: PaginationService;
  let control: PaginationControl;
  const ID = 'test';

  beforeEach(() => {
    paginationService = new PaginationService();
    control = {
      id: ID,
      itemsPerPage: 10,
      totalItems: 100,
      currentPage: 1
    }
  });

  it('should register the control', () => {
    paginationService.register(control);
    expect(paginationService.getInstance(ID)).toEqual(control);
  });

  it('should return clone of control', function () {
    paginationService.register(control);
    expect(paginationService.getInstance(ID)).not.toBe(control);
  });

  it('should be able to set items per page', function () {
    paginationService.register(control);
    paginationService.setItemsPerPage(ID, 30);
    expect(paginationService.getInstance(ID).itemsPerPage).toBe(30);
  });

  it('should not be able to set items per page to negitive number', function () {
    paginationService.register(control);
    paginationService.setItemsPerPage(ID, -1);
    expect(paginationService.getInstance(ID).itemsPerPage).toBe(10);
  });

  it('should be able to set total items of control', function () {
    paginationService.register(control);
    paginationService.setTotalItems(ID, 500);
    expect(paginationService.getInstance(ID).totalItems).toBe(500);
  });

  it('should not be able to set total items to negitive value', function () {
    paginationService.register(control);
    paginationService.setTotalItems(ID, -10);
    expect(paginationService.getInstance(ID).totalItems).toBe(100);
  });

  it('should be able to set current page', function () {
    paginationService.register(control);
    paginationService.setCurrentPage(ID, 5);
    expect(paginationService.getInstance(ID).currentPage).toBe(5);
  });

  it('should be able to get current page', function () {
    paginationService.register(control);
    paginationService.setCurrentPage(ID, 5);
    expect(paginationService.getCurrentPage(ID)).toBe(5);
  });

  it('should be able to set to max page', function () {
    paginationService.register(control);
    paginationService.setCurrentPage(ID, 10);
    expect(paginationService.getCurrentPage(ID)).toBe(10);
  });

  it('should not be able to set page higher then number of pages', function () {
    paginationService.register(control);
    paginationService.setCurrentPage(ID, 20);
    expect(paginationService.getCurrentPage(ID)).toBe(1);
  });

  it('should not be able to set page below 1', function () {
    paginationService.register(control);
    paginationService.setCurrentPage(ID, 0);
    expect(paginationService.getCurrentPage(ID)).toBe(1);

    paginationService.setCurrentPage(ID, -1);
    expect(paginationService.getCurrentPage(ID)).toBe(1);
  });


});
