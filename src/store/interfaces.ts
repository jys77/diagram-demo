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

export interface AnchorPath {
  fromId: number | null;
  toId: number | null;
  x1: number | null;
  y1: number | null;
  x2: number | null;
  y2: number | null;
  fromEdge: 't' | 'b' | 'l' | 'r' | null;
  toEdge: 't' | 'b' | 'l' | 'r' | null;
}
