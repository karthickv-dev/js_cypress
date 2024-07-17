const add = require("./add");
const express = require("express");
describe("add function", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("adds -1 + 5 to equal 4", () => {
    expect(add(-1, 5)).toBe(4);
  });

  it("adds 0 + 0 to equal 0", () => {
    expect(add(0, 0)).toBe(0);
  });

  it("adds 5 + 5 to equal 10", () => {
    expect(add(5, 5)).toBe(10);
  });
});
