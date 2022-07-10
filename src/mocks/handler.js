import { rest } from 'msw';

const BASE_URL = 'http://localhost:5000';
export const handlers = [
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "name": "America",
                    "imagePath": "/images/america.jpeg"
                },
                {
                    "name": "England",
                    "imagePath": "/images/england.jpeg"
                }
            ])
        )
    }),
    rest.get(`${BASE_URL}/options`, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Insurance'
                },
                {
                    name: 'Dinner'
                }
            ])
        )
    })
]