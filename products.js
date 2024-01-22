export function Products() {
    return <ProductTable products={PRODUCTS}/>;
}

function ProductTable({products}) {
    const rows = [];
    let lastCategory = null;

    products.map((product) => {
        if (product.category !== lastCategory) {
            rows.push(
                <CategoryRow category={product.category} key={product.category}/>
            )
        }
        rows.push(
            <ProductRow product={product} key={product.name}/>
        )
        lastCategory = product.category
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>

        </table>
    )
}

function CategoryRow({category}) {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    )
}

function ProductRow({product}) {
    const name = product.stocked ? product.name : <span style={{opacity: '0.5'}}>{product.name}</span>
    const price = product.stocked ? product.price : <span style={{opacity: '0.3'}}>{product.price}</span>
    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
        </tr>
    )
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Персик"},
    {category: "Fruits", price: "$1", stocked: true, name: "Яблоко"},
    {category: "Fruits", price: "$2", stocked: false, name: "Абрикос"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Картошка"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Огурец"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Помидор"}
];
