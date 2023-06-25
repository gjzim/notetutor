import { render, screen } from "@testing-library/react";
import NoticeWrong from "./NoticeWrong";

describe("NoticeWrong", () => {
    it("renders correctly", () => {
        const { container } = render(<NoticeWrong answer="a#" />);

        /* eslint-disable testing-library/no-node-access */
        /* eslint-disable testing-library/no-container */
        expect(container.querySelector("svg.fa-xmark")).toBeInTheDocument();
        expect(screen.getByText(/wrong!/i)).toBeInTheDocument();
        expect(container.querySelector(".AnsText")?.textContent).toBe("Correct Note:a#");
    });
});
