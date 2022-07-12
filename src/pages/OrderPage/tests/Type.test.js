import { render, screen } from '../../../test-utils';
import { server } from '../../../mocks/server';
import Type from '../Type'
import { rest } from 'msw';

test("display products images from server", async () => {
    // Provider 감싸기
    render(<Type orderType="products" />)
    
    const productImages = await screen.findAllByRole("img", {
        name: /product$/i
    })

    expect(productImages).toHaveLength(2);

    const altText = productImages.map((element) => element.alt)
    expect(altText).toEqual(['America product', 'England product']);
})

test("when fetching product data, face an error", async () => {
    server.resetHandlers(
        rest.get('http://localhost:5000/products', (req, res, ctx) => {
            return res(ctx.status(500))  
        })
    )

    render(<Type orderType="proudcts" />)
    const errorBanner = await screen.findByTestId("error-banner");

    expect(errorBanner).toHaveTextContent("에러가 발생했습니다.")
})

test("fetch option information from server", async () => {
    render(<Type orderType="options" />)

    const optionCheckBoxes = await screen.findAllByRole("checkbox")
    expect(optionCheckBoxes).toHaveLength(2);
})