import { render, screen } from '../../../test-utils';
import userEvent from "@testing-library/user-event"
import { OrderContextProvider } from "../../../contexts/OrderContext"
import Type from "../Type"
import { TESTING_FRAMEWORK_SETUP_HOOKS } from 'eslint-plugin-testing-library/utils';
import OrderPage from '../OrderPage';

test("update product's total when products change", async () => {
    render(<Type orderType="products" /> )

    const productsTotal = screen.getByText("상품 총 가격:", { exact: false })
    expect(productsTotal).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
        name: "America"
    })

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(productsTotal).toHaveTextContent("1000");
})

test("update option's total when options change", async () => {
    render(<Type orderType="options" />);

    const optionsTotal = screen.getByText('옵션 총 가격:', { exact: false })
    expect(optionsTotal).toHaveTextContent('0');

    const insuranceCheckbox = await screen.findByRole('checkbox', {
        name: "Insurance"
    })

    userEvent.click(insuranceCheckbox);
    expect(optionsTotal).toHaveTextContent('500');

    const dinnerCheckbox = await screen.findByRole('checkbox', {
        name: "Dinner"
    })

    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('1000')
})

describe("total price of goods and options", () => {
    test("total price starts with 0 and updating total price when adding one product", async () => {
        render(<OrderPage />)

        const total = screen.getByText("Total Price:", { exact: false })
        expect(total).toHaveTextContent('0');

        const americaInput = await screen.findByRole("spinbutton", {
            name: "America"
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput, "1");

        expect(total).toHaveTextContent("1000")
    })

    test("updating total price when adding one product", async () => {
        render(<OrderPage />)

        const total = screen.getByText("Total Price:", { exact: false })
        expect(total).toHaveTextContent('0');

        const insuranceCheckbox = await screen.findByRole("checkbox", {
            name: "Insurance"
        });
        
        userEvent.click(insuranceCheckbox);
        expect(total).toHaveTextContent("500")
    })

    test("updating total price when removing one option and one product", async () => {
        render(<OrderPage />)
        const total = screen.getByText("Total Price:", { exact: false })

        const insuranceCheckbox = await screen.findByRole('checkbox', {
            name: "Insurance"
        });
        userEvent.click(insuranceCheckbox);

        const americaInput = await screen.findByRole("spinbutton", {
            name: "America"
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput, "3")

        userEvent.clear(americaInput);
        userEvent.type(americaInput, "1");

        expect(total).toHaveTextContent("1500")
    })
    
})