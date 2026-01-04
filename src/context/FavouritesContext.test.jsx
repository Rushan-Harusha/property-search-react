import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavouritesProvider, useFavourites } from "./FavouritesContext";

function TestHarness() {
  const { favouriteIds, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  return (
    <div>
      <div data-testid="ids">{JSON.stringify(favouriteIds)}</div>

      <button onClick={() => addFavourite("prop1")}>add-prop1</button>
      <button onClick={() => addFavourite("prop1")}>add-prop1-again</button>
      <button onClick={() => removeFavourite("prop1")}>remove-prop1</button>
      <button onClick={clearFavourites}>clear</button>
    </div>
  );
}

describe("FavouritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a favourite only once (prevents duplicates)", async () => {
    const user = userEvent.setup();

    render(
      <FavouritesProvider>
        <TestHarness />
      </FavouritesProvider>
    );

    await user.click(screen.getByText("add-prop1"));
    await user.click(screen.getByText("add-prop1-again"));

    expect(screen.getByTestId("ids")).toHaveTextContent('["prop1"]');
  });

  it("removes a favourite", async () => {
    const user = userEvent.setup();

    render(
      <FavouritesProvider>
        <TestHarness />
      </FavouritesProvider>
    );

    await user.click(screen.getByText("add-prop1"));
    await user.click(screen.getByText("remove-prop1"));

    expect(screen.getByTestId("ids")).toHaveTextContent("[]");
  });

  it("clears all favourites", async () => {
    const user = userEvent.setup();

    render(
      <FavouritesProvider>
        <TestHarness />
      </FavouritesProvider>
    );

    await user.click(screen.getByText("add-prop1"));
    await user.click(screen.getByText("clear"));

    expect(screen.getByTestId("ids")).toHaveTextContent("[]");
  });

  it("loads initial favourites from localStorage", () => {
    localStorage.setItem("favouritePropertyIds", JSON.stringify(["prop2"]));

    render(
      <FavouritesProvider>
        <TestHarness />
      </FavouritesProvider>
    );

    expect(screen.getByTestId("ids")).toHaveTextContent('["prop2"]');
  });
});
