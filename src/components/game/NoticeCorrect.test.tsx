import { render, screen } from "@testing-library/react";
import NoticeCorrect from "./NoticeCorrect";

describe("NoticeCorrect", () => {
    it("renders correctly", () => {
        const { container } = render(<NoticeCorrect />);

        /* eslint-disable testing-library/no-node-access */
        /* eslint-disable testing-library/no-container */
        expect(container.querySelector("svg.fa-check")).toBeInTheDocument();
        expect(screen.getByText(/correct/i)).toBeInTheDocument();
    });
});
