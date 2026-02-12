import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/components/empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState title="Тестовый заголовок" description="Тестовое описание" />,
    );

    expect(screen.getByText("Тестовый заголовок")).toBeInTheDocument();
    expect(screen.getByText("Тестовое описание")).toBeInTheDocument();
  });
});
