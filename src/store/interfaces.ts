import { Component } from '../customComponents/interfaces';

export type CompDataItem = Component & {
  id: number;
};

export interface DashLinePos {
  start: {
    x: number;
    y: number;
  }
  end: {
    x: number;
    y: number;
  }
}
